import { Text } from 'components/typography';
import { ReactComponent as TeamsIcon } from '../../../components/icons/teams.svg';
import { COLORS } from 'helpers/constants';

export const GroupProjectsHeader: React.FC<{
  memberCount: number;
  onSetIsOpenDrawer: (value: boolean) => void;
  title: string | null;
}> = ({ memberCount, onSetIsOpenDrawer, title }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          padding: '8px',
          marginTop: '16px',
        }}
      >
        <Text style={{ fontSize: '24px' }}>{title} / Projects</Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <TeamsIcon />
          {memberCount}
          <Text
            onClick={() => onSetIsOpenDrawer(true)}
            color={COLORS.PRIMARY.BLUE}
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            See all members
          </Text>
        </div>
      </div>
    </>
  );
};
