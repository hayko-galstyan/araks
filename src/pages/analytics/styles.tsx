import styled from 'styled-components';
import { COLORS } from 'helpers/constants';

export const AnalyticToolsDashBoard = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 2px dashed ${COLORS.MAIN_GRAY_SILVER};
  background: ${COLORS.PRIMARY.WHITE};
  position: relative;
  left: 5px;
  top: 5px;
  border-radius: 4px;

  & .react-resizable-handle {
    position: absolute;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-origin: content-box;
    background-size: contain;
    box-sizing: border-box;
    background-image: url('data:image/svg+xml;base64,PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KDTwhLS0gVXBsb2FkZWQgdG86IFNWRyBSZXBvLCB3d3cuc3ZncmVwby5jb20sIFRyYW5zZm9ybWVkIGJ5OiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KDTxnIGlkPSJTVkdSZXBvX2JnQ2FycmllciIgc3Ryb2tlLXdpZHRoPSIwIi8+Cg08ZyBpZD0iU1ZHUmVwb190cmFjZXJDYXJyaWVyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KDTxnIGlkPSJTVkdSZXBvX2ljb25DYXJyaWVyIj4gPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzE1Xzc4NCkiPiA8cmVjdCB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIi8+IDxwYXRoIGQ9Ik0xMy44Mjg0IDEzLjgyODRMMjAuODk5NSAyMC44OTk1TTIwLjg5OTUgMjAuODk5NUwyMC43ODE2IDE1LjEyNDhNMjAuODk5NSAyMC44OTk1TDE1LjEyNDggMjAuNzgxNiIgc3Ryb2tlPSIjMjMyRjZBIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gPHBhdGggZD0iTTkuODk5NDggMTMuODI4NEwyLjgyODQxIDIwLjg5OTVNMi44Mjg0MSAyMC44OTk1TDguNjAzMTIgMjAuNzgxNk0yLjgyODQxIDIwLjg5OTVMMi45NDYyNiAxNS4xMjQ4IiBzdHJva2U9IiMyMzJGNkEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPiA8cGF0aCBkPSJNMTMuODI4NCA5Ljg5OTVMMjAuODk5NSAyLjgyODQzTTIwLjg5OTUgMi44Mjg0M0wxNS4xMjQ4IDIuOTQ2MjlNMjAuODk5NSAyLjgyODQzTDIwLjc4MTYgOC42MDMxNCIgc3Ryb2tlPSIjMjMyRjZBIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4gPHBhdGggZD0iTTkuODk5NDcgOS44OTk1MUwyLjgyODQgMi44Mjg0NE0yLjgyODQgMi44Mjg0NEwyLjk0NjI2IDguNjAzMTVNMi44Mjg0IDIuODI4NDRMOC42MDMxMSAyLjk0NjI5IiBzdHJva2U9IiMyMzJGNkEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPiA8L2c+IDxkZWZzPiA8Y2xpcFBhdGggaWQ9ImNsaXAwXzE1Xzc4NCI+IDxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0id2hpdGUiLz4gPC9jbGlwUGF0aD4gPC9kZWZzPiA8L2c+Cg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
  }
`;
