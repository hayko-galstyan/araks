import styled from 'styled-components';

export const IconWrapper = styled.div`
  & {
    position: fixed;
    right: 20px;
    bottom: 15px;
    z-index: 100;
    animation: animation 1s infinite;

    @keyframes animation {
      0% {
        transform: scale(0.9);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;
