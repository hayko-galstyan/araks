import { Row, Space } from 'antd';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { ReactComponent as BackSvg } from 'components/icons/back.svg';

const StyledBackSvg = styled(BackSvg)`
  fill: ${COLORS.PRIMARY.GRAY_LIGHT};
  width: 24px;
  height: 24px;
`;
const StyledPrevkSvg = styled(BackSvg)`
  fill: ${COLORS.PRIMARY.GRAY_LIGHT};
  width: 24px;
  height: 24px;
  rotate: 180deg;
`;
const StyledButton = styled.button`
  height: 24px;
  width: 24px;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledText = styled.p`
  size: 20px;
  font-family: Rajdhani;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 7%;
  color: ${COLORS.BLUE_10};
`;
interface Props {
  count: number | undefined;
  size?: number;
  page: number;
  setPage: (page: number) => void;
}
export const AdminPagination = ({ count, size = 10, page, setPage }: Props) => {
  const handleNext = () => {
    if (count && page < Math.ceil(count / size)) {
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return count && count !== 0 ? (
    <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
      <Row style={{ flexWrap: 'nowrap', alignItems: 'center', gap: '10px' }}>
        <StyledText>
          {(page - 1) * size + 1} - {page * size < count ? page * size : count} / {count}
        </StyledText>
        <StyledButton onClick={handlePrev}>
          <StyledBackSvg />
        </StyledButton>
        <StyledButton onClick={handleNext}>
          <StyledPrevkSvg />
        </StyledButton>
      </Row>
    </Space>
  ) : (
    <></>
  );
};
