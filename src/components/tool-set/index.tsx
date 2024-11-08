import { Space } from 'antd';
import { SecondaryText } from '../typography';
import { ReactComponent as ToolsetSvg } from './icons/tool-set.svg';
import { ReactComponent as ArrowSvg } from './icons/arrow-up.svg';

export const Toolset = () => {
  return (
    <Space style={{ display: 'flex', alignItems: 'center', gap: '8px'}}>
      <ToolsetSvg />
      <SecondaryText style={{ fontSize: '20px' }}>Toolset</SecondaryText>
      <ArrowSvg />
    </Space>
  );
};
