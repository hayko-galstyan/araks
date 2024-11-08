import { Flex } from 'antd';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';

export const ToolParamsForm = styled(Flex)`
  width: 100%;
  gap: 24px;
  margin-top: 24px;
  padding: 10px;
  border: 1px dashed ${COLORS.MAIN_GRAY_SILVER};

  & .analytic-editor .ql-container.ql-snow {
    border: none;
  }
`;
