import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useGetUserGlobalSearch } from 'api/user/use-get-user-global-search';
import { AutoComplete, StyledSearchTitle } from './options/styles';
import { renderProjects } from './options/projects';
import { renderTypes } from './options/node-type';
import { renderNodes } from './options/nodes';
import { PATHS } from 'helpers/constants';
import { GET_SEARCH_GLOBAL_DATA, GET_SEARCH_GROUP_PROJECTS_DATA } from 'api/user/constants';
import { useGetSelectedSearchData } from 'api/visualisation/use-get-selected-search';
import { renderProperty } from './options/property-type';
import { renderComments } from './options/comments';

enum ProjectPrivacy {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

type TVisualizationType = {
  nodeType: boolean;
  propertyType: boolean;
  node: boolean;
  comments: true;
};

const visualizationType: TVisualizationType = {
  nodeType: true,
  propertyType: true,
  node: true,
  comments: true,
};

type SearchItem = {
  key: string;
  id: string;
  mode: string;
  value: string;
  privacy: string;
  label: JSX.Element;
  node_id?: string;
  project_id?: string;
  title?: string;
};

type ISearchProps = {
  typeSearch?: string;
  group?: string | null;
  onSetIsProjectId?: (value: string | undefined) => void;
  setIsProjectListId?: ((value: string) => void) | undefined;
  placeholder?: string;
};

export const Search = ({ typeSearch, onSetIsProjectId, group, setIsProjectListId, placeholder }: ISearchProps) => {
  const [search, setSearch] = useState<string>('');
  const [project, setProject] = useState<{ id: string; privacy: boolean; node_id: string | undefined , autoCommentsIsOpen:boolean}>({
    id: '',
    privacy: false,
    node_id: '',
    autoCommentsIsOpen: false,
  });
  const navigate = useNavigate();

  const url = group ? GET_SEARCH_GROUP_PROJECTS_DATA.replace(':id', group) : GET_SEARCH_GLOBAL_DATA;

  const { data } = useGetUserGlobalSearch(
    url,
    { enabled: search ? search.trim().length > 2 : false },
    search?.trim() ?? ''
  );

  const { mutate } = useGetSelectedSearchData(project.id ?? '', {
    onSuccess: (data) => {
      const url = project.privacy
        ? PATHS.PUBLIC_PREFIX.concat(PATHS.PROJECT_VISUALISATION)
        : PATHS.PROJECT_VISUALISATION;
      navigate(`${url}`.replace(':id', project.id), {
        state: {
          data: data.data,
          autoCommentsIsOpen: project.autoCommentsIsOpen,
          node_id: project.node_id
        },
      });
    },
  });

  const projects = useMemo(
    () =>
      data?.projects?.map(({ id, title, color, icon, privacy }) => renderProjects(id, title, color, icon, privacy)) ??
      [],
    [data?.projects]
  );

  const nodeTypes = useMemo(
    () =>
      data?.types?.map(({ id, node_type_id, title, color, name, privacy, icon, project_id }) =>
        renderTypes(id, node_type_id, title, color, name, privacy, icon, project_id)
      ) ?? [],
    [data?.types]
  );

  const nodes = useMemo(
    () =>
      data?.nodes?.map(({ project_id, id, title, color, name, privacy, default_image, icon, node_type }) =>
        renderNodes(project_id, id, title, color, name, privacy, default_image, icon, node_type)
      ) ?? [],
    [data?.nodes]
  );
  const comments = useMemo(
    () =>
      data?.comments?.map(
        ({ id, project_id, privacy, title, icon, color, node_id, name, node_type, default_image, comments }) =>
          renderComments(id, project_id, privacy, title, icon, color, node_id, name, node_type, default_image, comments)
      ) ?? [],
    [data?.comments]
  );

  const properties = useMemo(
    () =>
      data?.properties?.map(
        ({
          id,
          title,
          color,
          node_id,
          project_id,
          icon,
          privacy,
          node_name,
          property,
          node_type,
          default_image,
          user_id,
        }) =>
          renderProperty(
            id,
            title,
            color,
            node_id,
            project_id,
            icon,
            privacy,
            node_name,
            property,
            node_type,
            default_image,
            user_id
          )
      ) ?? [],
    [data?.properties]
  );

  const renderTitle = (title: string) => <StyledSearchTitle>{title}</StyledSearchTitle>;

  const options = [];

  if (projects.length > 0) {
    options.push({
      label: renderTitle('Projects'),
      options: projects,
    });
  }

  if (nodeTypes.length > 0 && !typeSearch && !group) {
    options.push({
      label: renderTitle('Types'),
      options: nodeTypes,
    });
  }

  if (nodes?.length > 0 && typeSearch !== 'projects') {
    options.push({
      label: renderTitle('Nodes'),
      options: nodes,
    });
  }

  if (properties?.length > 0 && typeSearch !== 'projects') {
    options.push({
      label: renderTitle('Properties'),
      options: properties,
    });
  }
  if (comments?.length > 0) {
    options.push({
      label: renderTitle('Comments'),
      options: comments,
    });
  }

  const onSelect = (id: string | unknown, item: { mode: string } | unknown) => {
    const { mode } = item as { mode: string };

    const listMap: Record<string, SearchItem[]> = {
      nodeType: nodeTypes,
      node: nodes,
      propertyType: properties,
      comments: comments,
    };
    const list = listMap[mode] || projects;

    const type = list?.find((data) => data.value === id) as SearchItem;

    const privacyPath = type?.privacy === ProjectPrivacy.PUBLIC ? `${PATHS.PUBLIC}` : '';

    const action = mode === 'nodeType' ? 'nodeType' : 'node';

    const isVisualization = visualizationType[mode as keyof TVisualizationType];

    const action_id = mode === 'propertyType' || mode === 'comments' ? type?.node_id : type?.id;

    if (isVisualization) {
      setProject({
        id: type?.project_id || '',
        privacy: type?.privacy === ProjectPrivacy.PUBLIC,
        autoCommentsIsOpen: type?.mode === 'comments',
        node_id: type && type.mode && type?.mode === 'comments' ? type.node_id : undefined,
      });
      mutate({ id: action_id || '', action: action, _ts: new Date().getTime() });
    } else {
      setIsProjectListId && setIsProjectListId(type?.id ?? '');
      setSearch((prevValue) => type?.title ?? prevValue);
      const id = mode === 'projectType' ? type?.id : type?.project_id;
      typeSearch !== 'projects' && navigate(`${privacyPath}${PATHS.PROJECTS}/${id}`);
    }
  };

  return (
    <AutoComplete
      popupClassName="certain-category-search-dropdown"
      popupMatchSelectWidth={500}
      dropdownMatchSelectWidth={400}
      style={{ width: 500 }}
      onSelect={onSelect}
      options={options}
      value={search}
    >
      <Input
        prefix={<SearchOutlined style={{ fontSize: '18px' }} />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder || 'Search'}
      />
    </AutoComplete>
  );
};
