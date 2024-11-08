import { Space } from 'antd';

import { ViewProvider } from 'context/view-context';
import { SortProvider } from 'context/sort-context';
import { PROJECT_SORT, Sort } from 'components/dropdown';
import { View } from 'components/view';
import { VerticalSpace } from 'components/space/vertical-space';
import { PATHS } from 'helpers/constants';

type Props = {
  children: React.ReactNode;
};

export const ProjectList = ({ children }: Props) => {
  return (
    <ViewProvider>
      <SortProvider defaultValue={PROJECT_SORT[2].key}>
        <VerticalSpace size="large">
          {location.pathname !== PATHS.TEMPLATE && (
            <Space style={{ display: 'flex', justifyContent: 'end' }}>
              <Space size="middle">
                <Sort sortItems={PROJECT_SORT} />
                <View />
              </Space>
            </Space>
          )}

          {children}
        </VerticalSpace>
      </SortProvider>
    </ViewProvider>
  );
};
