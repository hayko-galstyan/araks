import { Typography } from 'antd';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
const { Title } = Typography;

export const TitleStyle = styled(Title)`
  font-size: 18px !important;
  border-bottom: 1px solid ${COLORS.PRIMARY.GRAY_LIGHT};
  padding-left: 5%;
  padding: 20px;
  margin: 0;
`;
