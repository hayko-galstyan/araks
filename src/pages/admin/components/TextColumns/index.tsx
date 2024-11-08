import { Space } from 'antd';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';

const StyledText = styled.p`
  font-size: 20px;
  font-family: 'Rajdhani';
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 1px;
  color: ${COLORS.PRIMARY.BLUE};
`;
interface Props {
  value: string;
}
export const TextColumns = ({ value }: Props) => {
  return (
    <Space style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
      <StyledText>{value}</StyledText>
    </Space>
  );
};
