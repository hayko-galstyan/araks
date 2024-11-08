import { useGetAdminStaticsCountData } from 'api/admin/use-get-statics-counts';
import { COLORS } from 'helpers/constants';
import { AdminDataAnalyseCount } from 'pages/admin/components/DataAnalysesWithCount';
import { AdminProjectsCount } from 'pages/admin/components/projectsCounts.tsx';
import { AdminUsersAnalyseCount } from 'pages/admin/components/usersAnalyseWithCount';
import { AdminUsersCount } from 'pages/admin/components/UsersCount';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 800px;
  background-color: ${COLORS.PRIMARY.WHITE};
  gap: 40px;
  border-radius: 8px;
  padding: 20px;
  outline: none;
  overflow: hidden;
`;

export const DashboardAdmin = () => {
  const { data, isSuccess } = useGetAdminStaticsCountData();

  return (
    <Container>
      {isSuccess && <AdminUsersCount activeUsers={data?.data?.actives} inactiveUsers={data?.data?.in_actives} />}
      <AdminUsersAnalyseCount />
      {isSuccess && (
        <AdminProjectsCount
          projectsCount={data?.data?.projects}
          nodeCount={data?.data?.nodes}
          connectionCount={data?.data?.edges}
          filesCount={data?.data?.files}
        />
      )}
      <AdminDataAnalyseCount />
    </Container>
  );
};
