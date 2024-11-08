import React, { useState } from 'react';
import { Main } from './components/main';
import { Footer } from './components/footer';
import styled from 'styled-components';
import { Header } from './components/header';
import { FormTemplate } from './components/form';

const VerticalRow = styled.div`
  height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
`;

export const ProjectTemplate: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <FormTemplate>
      <VerticalRow>
        <Header step={step} />
        <Main step={step} />
        <Footer step={step} setStep={setStep} />
      </VerticalRow>
    </FormTemplate>
  );
};
