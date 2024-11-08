import { StyledMainWrapper } from './styles';
import { QueriesButton } from '../../../components/button/queries-button';
import { Dispatch, SetStateAction } from 'react';
type Props = {
  activeQuerisID: { name: string; id: string } | null;
  setActiveQuerisID: (activeQuerisID: { name: string; id: string } | null) => void;
  queryCollapsed?: boolean;
  setQueryCollapsed?: Dispatch<SetStateAction<boolean>>;
};

export const Queries = ({ activeQuerisID, setActiveQuerisID, queryCollapsed, setQueryCollapsed }: Props) => {
  return (
    <>
      <StyledMainWrapper>
        <QueriesButton
          setActiveQuerisID={setActiveQuerisID}
          activeQuerisID={activeQuerisID}
          isQueries={true}
          queryCollapsed={queryCollapsed}
          setQueryCollapsed={setQueryCollapsed}
        />
      </StyledMainWrapper>
    </>
  );
};
