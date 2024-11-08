import * as React from 'react';

export enum ModeTypes {
  List = 0,
  Grid = 1,
  Visualization = 2,
}

type Dispatch = React.Dispatch<React.SetStateAction<ModeTypes>>;
type ViewProviderProps = { children: React.ReactNode };

const ModeContext = React.createContext<{ state: ModeTypes; dispatch: Dispatch } | undefined>(undefined);

function ModeProvider({ children }: ViewProviderProps) {
  const [selectedView, setSelectedView] = React.useState<ModeTypes>(ModeTypes.Grid);
  const value = React.useMemo(() => ({ state: selectedView, dispatch: setSelectedView }), [selectedView]);
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

function useMode() {
  const context = React.useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ViewProvider');
  }
  return context;
}

export { ModeProvider, useMode };
