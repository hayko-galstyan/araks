import { PropertyTypes } from 'components/form/property/types';
import { EdgeType } from 'types/node';
import { IEnumProperty } from 'types/project-node-types-property';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { IDocumentsTypeData } from '../types/document-repository';
import { IJiraProject } from '../types/jira-integration';
import { AnyObject } from 'antd/es/_util/type';

export type GetProjectsParameters = {
  page?: number;
  size?: number;
  sortField?: string;
  sortOrder?: string;
};
export type GetTemplatesMyParameters = {
  search: string | undefined;
  page?: number;
  size?: number;
};
export type TemplatesItemInfo = {
  id: string;
  name: string;
  description: string | undefined;
  screenshot: string | null;
  privacy: 'public' | 'private' | 'default';
  created_by: {
    avatar: string | null;
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};
export type TemplateUpdateResponseDataError = {
  message: string;
};

export type PageParameters = {
  page: number;
  size: number;
  sortOrder?: string;
  sortFieldId?: string;
  allowDocumentCount?: boolean;
  filters?: {
    key: string;
    value: boolean | React.Key | undefined;
  }[];
};

export type SearchPageParameters = PageParameters & {
  search?: string;
};

export type AllDataPageParameters = {
  page: number;
  size: number;
  sortField?: string;
  sortOrder?: string;
  search?: string;
  project_type_list_id?: string[];
  type?: string;
  allowDocumentCount?: boolean;
};

export enum RequestTypes {
  GET = 'get',
  Post = 'post',
  Put = 'put',
  Delete = 'delete',
}

export type RequestType = RequestTypes | undefined;

// Project related types
export type CreateOverviewFormData = {
  title: string;
  description: string;
  privacy: string;
  color: string;
  icon: string;
  folder_id: string;
};

export enum UserProjectRole {
  Owner = 'owner',
  Editor = 'edit',
  Viewer = 'view',
}

export type PerspectiveUser = {
  role: UserProjectRole;
};

export type ProjectFullInfo = {
  color: string;
  created_at: string;
  description: string;
  edgeTypesCount: string;
  edgesCount: string;
  folder_id: string;
  icon: string;
  id: string;
  notifications: boolean;
  nodeTypesCount: string;
  documentsCount: string;
  properties: ProjectReturnData[];
  nodesCount: string;
  privacy: string;
  status: string;
  title: string;
  token: string;
  updated_at: string;
  user_id: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
  };
  role: UserProjectRole;
  projectsNodeTypes: IProjectType[];
  projectsEdgeTypes: {
    id: string;
    source_id: string;
    target_id: string;
    name: string;
  }[];
  commentCount?: number;
  favoriteCount?: number;
  views?: number;
};

export type ProjectInfoReturnData = {
  result: ProjectFullInfo;
};

export type UserData = {
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  username: string;
  avatar?: string;
};

export type ProjectReturnData = ProjectFullInfo & {
  user: UserData;
} & {
  jiraConnect: IJiraProject;
};

type ProjectTreeProperties = {
  id: string;
  name: string;
  default_property?: boolean;
};

export type ProjectTreeReturnData = {
  color: string;
  id: string;
  name: string;
  parent_id: string | null;
  properties?: ProjectTreeProperties[];
};

export interface ITypeProperty {
  id: string;
  name: string;
  multiple_type?: boolean;
  unique_type?: boolean;
  required_type?: boolean;
  default_property?: boolean;
  ref_property_type_id: string;
}

export interface IProjectType {
  color: string;
  id: string;
  name: string;
  parent_id: string | null;
  fx: number;
  fy: number;
  x?: number;
  y?: number;
  properties: ITypeProperty[];
}

export interface IPerspectiveTypes {
  project_node_type_id: string;
}

export type IProjectTypeData = ProjectFullInfo;

export type ProjectTypePropertyReturnData = {
  created_at: string;
  default_property: boolean;
  default_image: boolean;
  id: string;
  multiple_type: boolean;
  name: string;
  project_id: string;
  project_type_id: string;
  ref_property_type_id: string;
  required_type: boolean;
  unique_type: boolean;
  updated_at: string;
  user_id: string;
  source?: EdgeType;
  target?: EdgeType;
  source_attribute_id?: string;
  source_id?: string;
  target_id?: string;
  template_node_type_id?: string;
  template_id: string;
  enums_data?: IEnumProperty[];
  template_edge_type_id?: string;
};

export type NodeDataConnectionToSave = {
  target_id: string;
  target_type_id: string;
  source_id: string;
  source_type_id: string;
  name: string;
  id: string;
  rowId?: string; // used only for save, assign id to him then pass to packend
};

/** Folder types */
export type ProjectFolderReturnData = {
  id: string;
  title: string;
  status: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

/** Node Type Property */
export type ProjectNodeTypePropertyReturnData = {
  id: string;
  name: string;
  multiple_type: boolean;
  default_property: boolean;
  default_image: boolean;
  unique_type: boolean;
  required_type: boolean;
  user_id: string;
  project_id: string;
  project_type_id: string;
  ref_property_type_id: PropertyTypes;
  created_at: string;
  updated_at: string;
  enums_data: IEnumProperty[];
};

export type NodeEdgeTypesReturnData = {
  created_at: string;
  id: string;
  name: string;
  project_id: string;
  inverse: boolean;
  multiple: boolean;
  ref_property_type_id: number;
  source_attribute_id: string;
  source_id: string;
  source: {
    id: string;
    name: string;
    color?: string;
  };
  target: {
    id: string;
    name: string;
    color?: string;
  };
  target_id: string;
  updated_at: string;
  user_id: string;
  properties: ProjectTypePropertyReturnData[];
};

export interface CustomError {
  errors: {
    message: string;
  };
}
export interface ApiErrorResponse {
  response: {
    data: {
      httpCode: number;
      errors: {
        message: string;
      };
    };
  };
}

export interface ISharedPerspectiveData {
  created_at: string;
  id: string;
  perspective_id: string;
  perspective_user_id: string;
  project_id: string;
  role: string;
  status: string;
  updated_at: string;
  user_id: string;
}

export interface IResponsePerspectiveData {
  description: string;
  id: string;
  project_id: string;
  status: string;
  title: string;
  nodeType: { project_node_type_id: string }[];
  shared: ISharedPerspectiveData[];
}

export interface ISharedPerspectiveUser {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface ISharedPerspectiveUserData {
  perspective_id: string;
  status: string;
  role: string;
  perspective_users: ISharedPerspectiveUser;
}

export interface IResponsePerspectiveUsers {
  id: string;
  title: string;
  description: string;
  status: string;
  project_id: string;
  shared: ISharedPerspectiveUserData[];
  nodeType: [];
}

export type CheckPropertyBody = {
  project_id?: string;
  project_type_id?: string;
  ref_property_type_id?: PropertyTypes;
};

export type CheckPropertyResponse = {
  invalidCount: number;
  allCount: number;
};

export type ProjectCommentListParams = {
  project_id: string;
};

export type ProjectCommentManage = {
  comments: string;
  project_id?: string;
  parent_id?: string | null;
  node_id?: string | null; //for node comment case
  mentioned_users?: string[];
};

export type CommentData = {
  id: string;
  comments: string;
  parent_id: null;
  project_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  user: ISharedPerspectiveUser;
};

export type CommentsResponse = {
  count: number;
  rows: CommentData[];
};

export type LikesData = {
  id: string;
  created_at: string;
  updated_at: string;
  user: ISharedPerspectiveUser;
};

export type LikesResponse = {
  count: number;
  rows: LikesData[];
};

export type NotificationsParameters = {
  page?: number;
  size?: number;
  status?: string;
};

export enum NotificationActionTypes {
  'comment-project',
  'comment-node',
  'delete',
  'perspectives-add',
  'perspectives-update',
  'perspectives-delete',
}

export type NotificationsData = {
  id: string;
  text: string;
  user_id: string;
  mentioned_user_id: string;
  project_id: string;
  node_id: string;
  action_type:
    | 'comment-project'
    | 'comment-node'
    | 'delete'
    | 'perspectives-add'
    | 'perspectives-update'
    | 'perspectives-delete';
  status: 'read' | 'unread';
  created_at: string;
  updated_at: string;
  projects: {
    id: string;
    title: string;
  };
  nodes: {
    id: string;
    name: string;
  };
  user: UserData & {
    avatar: string;
  };
};

export type NotificationsResponse = {
  rows: NotificationsData[];
  count: number;
};

export interface IDataExternalResourcesItem {
  article: {
    abstract: string;
    article_url: string;
    article_id: string;
    language: string;
    name: string;
    pub_date: string;
    source: string;
    title: string;
    highlightedTitle?: React.ReactNode;
  };
  authors: Array<{
    affiliation: string;
    author_id: string;
    name: string;
  }>;
  country: string;
  keywords: string[];
  isChecked?: boolean;
}

export interface IExternalResourcesData {
  articles: Array<IDataExternalResourcesItem>;
  count: number;
}
export interface IResponseDocumentTypeData {
  id: string;
  name: string;
  count: string;
}

type UseGetDocumentTypesReturnData = {
  data: IResponseDocumentTypeData[];
};

export type UseGetDocumentTypesOptions = UseQueryOptions<
  UseGetDocumentTypesReturnData,
  Error,
  IResponseDocumentTypeData[]
>;

export type UseGetDocumentTypesResult = UseQueryResult<IResponseDocumentTypeData[]>;

export interface IDocumentResponse {
  id: string;
  project_type_id: string;
  document_name: string;
  node_name: string;
  url: string;
  mimetype: string;
  created_at: string;
}

export type GetDocumentsByTypeReturnData = {
  data?: IDocumentResponse[];
  count: number;
};

export type GetDocumentsByTypeRequestData = {
  project_type_id?: string;
  pageData: IDocumentsTypeData;
  search: string | undefined;
};

export interface IKeyword {
  count: number;
  name: string;
  taxonomy: string[];
  score: number;
}

export interface IDocumentTagResponse {
  all_doc_count: number;
  data: IDocumentResponse[];
  keywords: IKeyword[];
  status: number;
  url: string;
}

export type GetAdminUsersManagmentParameters = {
  search: string | undefined;
  page?: number;
  size?: number;
  sortField?: 'ASC' | 'DESC';
  sortOrder?: 'ASC' | 'DESC';
};
export type AdminUsersManagmentResponse = {
  avatar: string | null;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
  id: string;
  login_at: string;
  projects: string;
  status: 'active' | 'in_active';
};
export type GetAdminUsersDataParameters = {
  id: string;
  params: {
    search: string | undefined;
    page?: number;
    size?: number;
    sortField?: 'ASC' | 'DESC';
    sortOrder?: 'ASC' | 'DESC';
  };
};
export type AdminUsersDataResponse = {
  id: string;
  user_id: string;
  title: string;
  color: string;
  icon: string;
  node_types: string;
  edge_types: string;
  nodes: string;
  edges: string;
  created_at: string;
  updated_at: string;
};
export type AdminUsersGroupDataResponse = {
  id: string;
  admin_id: string;
  name: string;
  members: string;
  projects: string;
  created_at: string;
  updated_at: string;
};
export type AdminStaticsCountResponse = {
  actives: string;
  in_actives: string;
  projects: string;
  nodes: string;
  edges: string;
  files: string;
};

export type GetAdminAnalysesDasboardParameters = {
  type: 'users' | 'projects' | 'nodes' | 'edges' | 'files';
  year: number | undefined;
};

export type AdminAnalysesDashboardResponse = {
  year: number;
  month: string;
  count: string;
};

export type TAdminProjectChangeOwner = {
  user_id: string;
  old_user_id: string;
  ids: string[];
};

/* ANALYTICS */

export type TAnalyticsPropertyType = {
  id: string;
  name: string;
  ref_property_type_id: PropertyTypes;
};

export type TAnalyticsNodeTypeProperties = {
  id: string;
  name: string;
  color: string;
  properties: TAnalyticsPropertyType[];
  edges: Array<{
    id: string;
    name: string;
    properties: TAnalyticsPropertyType[];
    target: {
      id: string;
      name: string;
      color: string;
      properties: TAnalyticsPropertyType[];
    };
  }>;
};

export type TAnalyticsNodeType = {
  id: string;
  name: string;
  color: string;
};

export type TAnalyticsBoardItem = {
  id: string;
  user_id: string;
  project_id: string;
  name: string;
  position: number;
  created_at: string;
  updated_at: string;
};

export type TAnalyticsBoard = {
  legend: boolean | undefined;
  id: string;
  source_type_id: string;
  project_id: string;
  title: string;
  name: string;
  type: string;
  fx: number;
  fy: number;
  width: number;
  height: number;
  operator: string;
  color: string | null;
  colors: string[];
  valid: boolean;
  data: Array<{ [key: string]: string | number }>;
  params: AnyObject;
};

export type TBoardUpdateParam = {
  id: string;
  chart_id: string | undefined;
};

export type TTableData = {
  count: number;
  data: AnyObject[];
};

export type TUseGetTableExternalData = (
  id: string,
  page: number,
  options?: UseInfiniteQueryOptions<TTableData, Error>
) => {
  data: TTableData | undefined;
  isLoading: boolean;
  refetch: () => void;
  isFetching?: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<InfiniteQueryObserverResult<TTableData, Error>>;
  hasNextPage: boolean | undefined;
};
