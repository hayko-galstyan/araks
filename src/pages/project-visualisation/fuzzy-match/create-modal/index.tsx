import React from 'react';
import { FuzzyMatchHeader } from '../components/layouts/header';
import { FuzzyMatchFooter } from '../components/layouts/footer';
import { FuzzyMatchMain } from './layout/main/main';
import styled from 'styled-components';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { FuzzyMatchModal } from '../components/modal';
import { FuzzyMatchForm } from './components/form-data/fuzzy-form';
import { ConnectionInfo } from '../preview-modal/components/connection/connection-info';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Main = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 0;
`;

export const FuzzyMatchComponent: React.FC = () => {
  const { openFuzzy, finishFuzzyModal, openFuzzyPreview, finishFuzzyPreviewModal } = useGraph() || {};
  return (
    <FuzzyMatchModal open={openFuzzy} onCancel={finishFuzzyModal}>
      <FuzzyMatchForm>
        {!openFuzzyPreview?.isOpened ? (
          <Container>
            <FuzzyMatchHeader onCancel={finishFuzzyModal} />
            <FuzzyMatchMain />
            <FuzzyMatchFooter />
          </Container>
        ) : (
          <Container>
            <FuzzyMatchHeader onCancel={finishFuzzyPreviewModal} />
            <Main>
              <ConnectionInfo />
            </Main>
            <FuzzyMatchFooter />
          </Container>
        )}
      </FuzzyMatchForm>
    </FuzzyMatchModal>
  );
};
