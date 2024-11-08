import { Empty } from 'antd';
import { Text } from 'components/typography';
import styled from 'styled-components';

const StyleEmptyList = styled(Empty)`
  margin: 0;
  background: #f2f2f2;
  box-shadow: 0px 3px 3px rgba(111, 111, 111, 0.1);

  .ant-empty-image {
    display: none;
  }

  .ant-empty-description {
    padding: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    span {
      color: #c3c3c3;
    }
  }
`;

export const EmptyList = ({ text }: { text: string }) => (
  <StyleEmptyList description={<Text>{text}</Text>}></StyleEmptyList>
);
