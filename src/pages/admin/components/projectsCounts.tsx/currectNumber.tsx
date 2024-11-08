import { COLORS } from 'helpers/constants';
import { useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  position: relative;
`;
const TextNumber = styled.p`
  color: ${COLORS.PRIMARY.WHITE};
  text-align: center;
  font-family: 'Rajdhani';
  font-weight: 700;
  line-height: 20px;
  font-size: 26px;
`;

export const CurrentNumber = ({ value }: { value: number }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleChange = (number: number): string => {
    if (number > 999999999) {
      return `${(number / 1000000000).toFixed(1)} B`;
    } else if (number > 999999) {
      return `${(number / 1000000).toFixed(1)} M`;
    } else if (number > 999) {
      return `${(number / 1000).toFixed(1)} K`;
    } else {
      return `${number}`;
    }
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <TextNumber>{isHovered ? value : handleChange(value)}</TextNumber>
    </Container>
  );
};
