import React from 'react';
import { Button } from 'components/button';
import styled from 'styled-components';

interface FooterProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
}

const FooterWrapper = styled.div`
  height: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: end;

  button {
    margin-right: 2rem;
    min-width: 8rem;
    z-index: 1;
  }
`;
export const Footer: React.FC<FooterProps> = ({ step, setStep }) => (
  <FooterWrapper>
    {step! > 0 && <Button onClick={() => setStep(step! - 1)}>Prev</Button>}
    <Button
      type="primary"
      onClick={() => {
        setTimeout(()=>{
        if (step < 2) setStep(step + 1);
        }, 10) 
      }}
      htmlType={step === 2 ? 'submit' : 'button'}
    >
      {step === 2 ? 'Save' : 'Next'}
    </Button>
  </FooterWrapper>
);
