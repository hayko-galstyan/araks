import { Space } from 'antd';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
interface StyledTextProps {
  active: boolean;
}

const StyledCircle = styled.div<StyledTextProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? COLORS.ALERT.GREEN : COLORS.ALERT.RED)};
`;
const StyledText = styled.p<StyledTextProps>`
  font-size: 16px;
  font-family: 'Rajdhani';
  font-weight: 700;
  line-height: 25px;
  letter-spacing: 1px;
  color: ${COLORS.PRIMARY.BLUE};
`;
interface Props {
  value: string;
}
export const StatusColumns = ({ value }: Props) => {
  return (
    <Space style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
      <StyledCircle active={value === 'active'} />
      <StyledText active={value === 'active'}>{value === 'active' ? 'ACTIVE' : 'IN ACTIVE'}</StyledText>
    </Space>
  );
};
