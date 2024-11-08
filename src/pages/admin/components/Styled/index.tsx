import { Select } from "antd";
import { COLORS } from "helpers/constants";
import styled from "styled-components";
interface BoxProps {
  backgroundColor: string;
  active: boolean;
}
interface CardBoxProps {
  backgroundColor?: string;
}

export const CustomSelect = styled(Select)`
  width: 120px;
  height: 42px;
  border-color: ${COLORS.PRIMARY.GRAY_LIGHT} !important;
  border-width: 1px !important;
  border-radius: 4px;

  .ant-select-selector {
    border-color:${COLORS.PRIMARY.GRAY_LIGHT}  !important;
    height: 42px; 
    display: flex;
    align-items: center;
  }
`;
export const CustomAnimateButton = styled.button<BoxProps>`
  width: 180px;
  height: 64px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ active, backgroundColor }) => (active ? backgroundColor : '#F1F1F1')};
  box-shadow: ${({ active }) => (active ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none')};
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for transform and box-shadow */
  transform: ${({ active }) =>
    active ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)'}; /* Translation and scaling effect */
`;
export const TextNumber = styled.p`
  color: ${COLORS.PRIMARY.WHITE};
  text-align: center;
  font-family: 'Rajdhani';
  font-weight: 700;
  line-height: 20px;
  font-size: 26px;
`;
export  const CardText = styled.p`
  color: ${COLORS.PRIMARY.WHITE};
  text-align: center;
  font-family: 'Rajdhani';
  font-weight: 700;
  line-height: 16px;
  font-size: 20px;
`;
export const CardBox = styled.div<CardBoxProps>`
  width: 300px;
  height: 120px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor || COLORS.PRIMARY.WHITE};
`