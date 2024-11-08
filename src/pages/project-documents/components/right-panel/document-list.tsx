import { Grid } from './grid';
import { List } from './list';
import { ModeTypes, useMode } from 'context/document-mode-context';
import { DocumentGraph } from './graph';

export const DocumentList = ({ search }: { search?: string }) => {
  const { state } = useMode();

  switch (state) {
    case ModeTypes.Grid:
      return <Grid />;
    case ModeTypes.List:
      return <List />;
    default:
      return <DocumentGraph search={search} />;
  }
};
