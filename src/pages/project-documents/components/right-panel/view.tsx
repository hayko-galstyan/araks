import { Button } from 'antd';

import { ReactComponent as Grid } from 'components/icons/blocks.svg';
import { ReactComponent as GridSelected } from 'components/icons/blocks-selected.svg';
import { ReactComponent as Visualisation } from 'components/icons/visualization-default.svg';
import { ReactComponent as VisualisationSelected } from 'components/icons/visualisation-selected.svg';
import { ReactComponent as Blocks } from 'components/icons/grid.svg';
import { ReactComponent as BlocksSelected } from 'components/icons/grid-selected.svg';
import styled from 'styled-components';
import { useDocument } from 'components/layouts/components/document/wrapper';
import { ModeTypes, useMode } from 'context/document-mode-context';

const ViewButton = styled(Button)`
  background-color: transparent;
  border: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getIcons = (selected: ModeTypes, handleClick: { (selected: ModeTypes): void; (arg0: ModeTypes): void }) => {
  const handleSubmit = (mode: ModeTypes): void => {
    handleClick(mode);
  };

  switch (selected) {
    case ModeTypes.List:
      return (
        <>
          <ViewButton onClick={() => handleSubmit(ModeTypes.Grid)} icon={<Grid />} />
          <ViewButton icon={<BlocksSelected />} />
          <ViewButton onClick={() => handleSubmit(ModeTypes.Visualization)} icon={<Visualisation />} />
        </>
      );
    case ModeTypes.Grid:
      return (
        <>
          <ViewButton icon={<GridSelected />} />
          <ViewButton onClick={() => handleSubmit(ModeTypes.List)} icon={<Blocks />} />
          <ViewButton onClick={() => handleSubmit(ModeTypes.Visualization)} icon={<Visualisation />} />
        </>
      );
    case ModeTypes.Visualization:
      return (
        <>
          <ViewButton onClick={() => handleSubmit(ModeTypes.Grid)} icon={<Grid />} />
          <ViewButton onClick={() => handleSubmit(ModeTypes.List)} icon={<Blocks />} />
          <ViewButton icon={<VisualisationSelected />} />
        </>
      );
    default:
      return (
        <>
          <ViewButton onClick={() => handleSubmit(ModeTypes.Grid)} icon={<Grid />} />
          <ViewButton onClick={() => handleSubmit(ModeTypes.List)} icon={<Blocks />} />
          <ViewButton icon={<Visualisation />} />
        </>
      );
  }
};

export const DocumentView = () => {
  const { state, dispatch } = useMode();
  const { setDocumentId, setGraph } = useDocument() ?? {};

  const handleClick = (selected: ModeTypes) => {
    switch (selected) {
      case ModeTypes.Grid: {
        dispatch(ModeTypes.Grid);
        break;
      }
      case ModeTypes.List: {
        dispatch(ModeTypes.List);
        break;
      }
      default: {
        dispatch(ModeTypes.Visualization);
      }
    }
    setGraph(undefined);
    setDocumentId(undefined);
  };

  return <div style={{ display: 'flex', alignItems: 'center' }}>{getIcons(state, handleClick)}</div>;
};
