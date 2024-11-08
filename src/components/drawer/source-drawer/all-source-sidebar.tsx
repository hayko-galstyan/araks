import React from 'react';
import { SideBar, SideBarContent } from './style';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { Image } from 'antd';

const { BLUE_10 } = COLORS;

export const SourceSideBar: React.FC = () => {
  return (
    <SideBar>
      <Text style={{ fontSize: '20px' }} color={BLUE_10}>
        Source:
      </Text>
      <SideBarContent>
        <Image src="/pubmed-logo.png" preview={false} />
      </SideBarContent>
    </SideBar>
  );
};
