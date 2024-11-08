import styled from 'styled-components';

export const SideBar = styled.div`
  & {
    width: 230px;
    height: 100vh;
    padding: 29px 30px;
    box-shadow: 8px 0px 15px 0px #9e9e9e;
  }
`;

export const SideBarContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 26px;
  max-height: calc(100% - 200px);
  overflow: auto;
  & img {
    width: 140px !important;
    height: 50px !important;
    margin: 26px 0;
  }
`;

export const ScrollContent = styled.div`
  max-height: calc(100% - 103px);
  overflow: auto;

  & .see-more-btn {
    width: 100%;
    margin-top: 16px;
  }
`;

export const Content = styled.div`
  & {
    width: calc(100% - 392px);
    max-height: calc(100% - 55px);
    height: 100vh;
    padding: 25px;
  }
`;

export const ContentFooter = styled.div`
  margin-top: 18px;
`;
