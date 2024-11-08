import React from 'react';
import { itemsGroups } from './tabItems';
import { ImportTabs } from 'components/tabs/import-tabs';

export const Groups: React.FC = () => {
  return <ImportTabs items={itemsGroups} />;
};
