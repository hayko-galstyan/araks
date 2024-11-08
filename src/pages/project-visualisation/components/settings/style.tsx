import styled, { css } from 'styled-components';

export const ButtonStyles = css`
  display: flex;
  align-items: center;
  color: #232f6a;
  height: 3rem;
  font-weight: 600;
  letter-spacing: 1.4px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 10px 10px 0 rgba(141, 143, 166, 0.2);
  backdrop-filter: blur(7px);
`;

export const LayoutWrapper = styled.div<{ isDocument?: boolean }>`
  position: fixed;
  width: ${(props) => (props.isDocument ? 'auto' : '17rem')};
  top: 176px;
  right: ${(props) => (props.isDocument ? '11rem' : '20rem')};
  display: flex;
  gap: 0.5rem;

  button {
    ${ButtonStyles}
  }

  .layout {
    min-width: 160px;
  }

  .combo {
    color: #808080;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 1.4px;
  }
`;

export const ControlsWrapper = styled.div`
  position: fixed;
  width: 37rem;
  top: 176px;
  right: -17rem;
  display: flex;
  gap: 0.5rem;

  button {
    ${ButtonStyles}
  }

  .reset {
  color: white;
  background: #232f6a;
  font-size: 20px;

  &:hover {
    color: #232f6a !important;

    .reset-icon {
      stroke:  #232f6a ;
    }
  }
}
`;
