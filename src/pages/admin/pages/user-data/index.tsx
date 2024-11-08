import { Space, Tabs } from 'antd';
import styled from 'styled-components';
import { COLORS } from 'helpers/constants';
import { AdminProjectTab } from './project-tab';
import { ReactComponent as BackSvg } from 'components/icons/back.svg';
import { AdminGroupTab } from './group-tab';
interface Props {
  item: { id: string; name: string };
  setItem: (item: { id: string; name: string } | null) => void;
}
const StyledBackSvg = styled(BackSvg)`
  fill: ${COLORS.PRIMARY.GRAY_LIGHT};
  width: 26px;
  height: 26px;
`;
const Container = styled.div`
  width: 100%;
  min-height: 800px;
  flex-direction: column;
  background-color: ${COLORS.PRIMARY.WHITE};
  gap: 40px;
  border-radius: 8px;
  padding: 20px;
  margin: 0px;
`;
const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    width: 600px;
    height: 60px;
    align-items: center;
    justify-content: center;
    margin: 0;
    gap: 0;
    border-bottom: none;
  }

  .ant-tabs-tab {
    width: 200px !important;
    background-color: #f1f1f1 !important;
    align-items: center;
    justify-content: center;
    padding: 15px 30px !important;
    font-size: 24px !important;
    font-weight: 600 !important;
    border-radius: 8px 8px 0 0 !important;
    margin: 0 !important;
    color: #000 !important;
  }

  .ant-tabs-tab-active {
    background-color: #9197b4 !important;
    border-radius: 8px 8px 0 0 !important;
  }
  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #e0e0e0 !important;
  }

  .ant-tabs-ink-bar {
    display: none !important;
  }
`;

const StyledText = styled.p`
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 1px;
  color: ${COLORS.PRIMARY.BLUE};
  align-items: center;
`;
const { TabPane } = Tabs;

export const UsersDataAdmin = ({ item, setItem }: Props) => {
  return (
    <Container>
      <Space style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <StyledBackSvg onClick={() => setItem(null)} />
        <StyledText>{item?.name}</StyledText>
      </Space>

      <StyledTabs>
        <TabPane tab="Projects" key="1">
          <AdminProjectTab id={item?.id} />
        </TabPane>
        <TabPane tab="Groups" key="2">
          <AdminGroupTab id={item?.id} />
        </TabPane>
      </StyledTabs>
    </Container>
  );
};
