import styled from 'styled-components';
import { ReactComponent as Connection } from 'components/icons/connection.svg';
import { Col, Form, Row, Space } from 'antd';
import { Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { ReactComponent as ArrowSvg } from '../icons/arrow.svg';

const TypeColumn = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0;
  background: linear-gradient(139deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.2) 100%);
  box-shadow: 4px 0 4px 0 rgba(0, 0, 0, 0.1);
  padding: 0 0 16px;

  .text {
    padding-left: 16px;
  }
`;

const ArrowColumn = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderRow = styled(Row)`
  position: relative;
  background: #f2f2f2;
  box-shadow: 0 10px 10px 0 rgba(111, 111, 111, 0.1);
`;

export const ConnectionHeader = () => {
  const form = Form.useFormInstance();

  const { edge, target, source } = form.getFieldValue([]);

  return (
    <>
      <Space className="connection">
        <Connection />
        <Text>{edge?.name}</Text>
      </Space>
      <HeaderRow>
        <TypeColumn span={10}>
          <VerticalSpace style={{ width: '100%' }}>
            <div style={{ height: '9px', backgroundColor: source?.color }} />
            <Text className="text">{source?.name}</Text>
          </VerticalSpace>
        </TypeColumn>
        <ArrowColumn span={4}>
          <ArrowSvg />
        </ArrowColumn>
        <TypeColumn span={10}>
          <VerticalSpace style={{ width: '100%' }}>
            <div style={{ height: '9px', backgroundColor: target?.color }} />
            <Text className="text">{target?.name}</Text>
          </VerticalSpace>
        </TypeColumn>
      </HeaderRow>
    </>
  );
};
