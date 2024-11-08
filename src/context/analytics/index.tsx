import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { initialState } from './initialState';
import { reducer } from './reducer';
import { TAnalyticsActions, TAnalyticsContext, TAnalyticsState } from './types';

const AnalyticsContext = createContext<TAnalyticsContext | undefined>(undefined);

const AnalyticsProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer<(state: TAnalyticsState, action: TAnalyticsActions) => TAnalyticsState>(
    reducer,
    initialState
  );

  const handleAction = useCallback((data: TAnalyticsActions) => {
    dispatch(data);
  }, []);

  const context = useMemo(() => ({ ...state, handleAction }), [state, handleAction]);

  return <AnalyticsContext.Provider value={context}>{children}</AnalyticsContext.Provider>;
};

const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export { AnalyticsProvider, useAnalytics };
