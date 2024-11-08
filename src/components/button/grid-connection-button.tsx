import { Button, ButtonProps } from 'antd';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  border: none;
  text-align: start;
  display: flex;
  align-items: center;

  span {
    color: ${COLORS.PRIMARY.WHITE};
    display: inline-block;
    max-width: calc(100% - 32px); 
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ant-btn-icon path {
    fill: ${COLORS.PRIMARY.WHITE};
  }
`;

type Props = ButtonProps & {
  backgroundColor: string;
};

export const GridConnectionButton = ({ backgroundColor, children, ...props }: Props) => {
  return (
    <StyledButton size="middle" style={{ backgroundColor }} {...props}>
      <span>{children}</span>
    </StyledButton>
  );
};
