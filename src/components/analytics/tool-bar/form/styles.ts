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

  & .analytic-form-input,
  & .analytic-form-select .ant-select-selector,
  & .analytic-form-tree-select .ant-select-selector {
    font-size: 14px;
    padding: 8px;
    border: none;
    box-shadow: 3px 3px 2px ${COLORS.MAIN_GRAY_SILVER};
  }
`;
