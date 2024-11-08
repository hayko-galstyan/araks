import { VARIABLES } from 'helpers/constants';
import { LongTitle, MenuText, Text } from 'components/typography';
import { FC } from 'react';

type DocumentInfoProps = FC<{ ext: string; title: string }>;

export const DocumentInfo: DocumentInfoProps = ({ ext, title }) => (
  <div style={{ display: 'flex', alignItems: 'start', flexDirection: 'column' }}>
    {ext.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH ? <LongTitle name={ext} /> : <Text>{ext}</Text>}
    <MenuText title={title}>
      {title.length > VARIABLES.MAX_PROJECT_TITLE_LENGTH
        ? title?.substring(0, VARIABLES.MAX_PROJECT_TITLE_LENGTH) + '...'
        : title}
    </MenuText>
  </div>
);
