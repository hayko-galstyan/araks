import { useState } from 'react';

export const useCollapseHandling = () => {
  const [activeKey, setActiveKey] = useState<number>(0);

  const handleCollapseChange = (keys: string | string[]) => keys[0] && setActiveKey(parseInt(keys[0]));

  return { activeKey, handleCollapseChange };
};
