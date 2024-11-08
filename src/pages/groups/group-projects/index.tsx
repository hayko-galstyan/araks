import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { GroupProjectsHeader } from './header';
import { useCreateGroupProject } from 'api/groups/use-create-group-project';
import { useGetGroupProjects } from 'api/groups/use-get-group-projects';
import { useGetAllMembersGroup } from 'api/groups/use-get-all-members-group';
import { CreateNewProjectModal } from 'components/modal/create-new-project-modal';
import { Drawer } from 'components/drawer/group-members';
import { Wrapper } from '../components/styled';
import { Text } from 'components/typography';
import { ProjectButton } from 'components/button';
import { ReactComponent as AddProductIcon } from '../../../components/icons/plus-dashed.svg';
import { WarningModal } from 'components/modal/warning-modal';
import { ErrorResponse } from 'components/modal/types';
import dayjs from 'dayjs';
import { PATHS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';
import { Search } from 'components/search';

export const GroupProjects: React.FC = () => {
  const [isOpen, setIsOpenModal] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [projectId, setIsProject] = useState<string | undefined>();
  const [projectListId, setIsProjectListId] = useState<string | undefined>();
  const [warningModalProps, setWarningModalProps] = useState({
    isOpen: false,
    title: '',
    text: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuth();

  const { state } = useLocation();
  const { group_name, admin_id } = state;

  const { data, isLoading, refetch } = useGetGroupProjects(id ?? '');
  const { data: members, isLoading: isMembersLoading } = useGetAllMembersGroup(id ?? '');

  const { mutate: createProjectFn } = useCreateGroupProject();

  const handleOpenModal = useCallback(() => setIsOpenModal((prev) => !prev), []);

  const handleOpenDrawer = useCallback(() => setIsOpenDrawer((prev) => !prev), []);

  const handleFinish = useCallback(() => {
    createProjectFn(
      { group_id: id, project_id: projectListId },
      {
        onSuccess: () => {
          setIsOpenModal(false);
          setIsProject(undefined);
          refetch();
        },
        onError: (error: unknown) => {
          const message = (error as ErrorResponse).response?.data?.errors?.message || 'An unknown error occurred';
          setWarningModalProps({
            isOpen: true,
            title: 'Project Assignment Conflict',
            text: message,
          });
        },
      }
    );
  }, [createProjectFn, id, projectListId, refetch]);

  const checkMemberHasPermissonEdit = useCallback(
    (user_id: string): boolean => {
      return user?.user?.id === admin_id || user?.user?.id === user_id;
    },
    [user, admin_id]
  );

  const checkCanYouAddMember = useCallback((): boolean => {
    const member = members?.data?.find((el) => el?.member?.id === user?.user?.id);
    return !!data?.count && member?.role === 'owner';
  }, [data, members, user]);

  const checkCanYouAddProject = useCallback((): boolean => {
    const member = members?.data?.find((el) => el?.member?.id === user?.user?.id);
    return member?.role === 'owner' || member?.role === 'edit';
  }, [members, user]);

  return (
    <>
      <Search typeSearch="group-projects" group={id} placeholder="Search Groups" />
      <GroupProjectsHeader title={group_name} onSetIsOpenDrawer={handleOpenDrawer} memberCount={members?.count ?? 0} />
      <Spin indicator={<LoadingOutlined />} spinning={isLoading}>
        <Wrapper style={{ marginTop: '72px' }}>
          {checkCanYouAddProject() && (
            <Space
              onClick={handleOpenModal}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '8px' }}
            >
              <AddProductIcon />
              <Text>New Project</Text>
            </Space>
          )}
          {data?.data?.map((item) => (
            <ProjectButton
              key={item?.id}
              project={{
                color: item?.project.color,
                dateTime: dayjs(item?.project?.updated_at).format('YYYY-MM-DD HH:mm'),
                icon: item?.project.icon,
                name: item?.project.title,
                type: '',
                id: item?.project.id ?? '',
                folderId: id ?? '',
              }}
              isGroupProject={true}
              isHasPermissionEditing={checkMemberHasPermissonEdit(item?.project?.user?.id)}
              onOpenProject={() => navigate(PATHS.PROJECT_OVERVIEW.replace(':id', item?.project?.id))}
            />
          ))}
        </Wrapper>
      </Spin>
      <Drawer
        isHasPermission={checkCanYouAddMember()}
        members={members ?? undefined}
        isLoading={isMembersLoading}
        isOpen={isOpenDrawer}
        onSetIsOpenDrawer={handleOpenDrawer}
      />
      <CreateNewProjectModal
        isOpen={isOpen}
        onSetIsOpenModal={handleOpenModal}
        projectId={projectId}
        onSetIsProjectId={setIsProject}
        onFinish={handleFinish}
        setIsProjectListId={setIsProjectListId}
        projectListId={projectListId}
      />
      <WarningModal
        isOpen={warningModalProps.isOpen}
        onClose={() => setWarningModalProps({ ...warningModalProps, isOpen: false })}
        title={warningModalProps.title}
        text={warningModalProps.text}
      />
    </>
  );
};
