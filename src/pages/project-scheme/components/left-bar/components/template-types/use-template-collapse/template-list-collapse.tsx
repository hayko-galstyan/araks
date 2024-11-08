import { Dispatch, FC, SetStateAction, useState } from 'react';
import { COLORS } from 'helpers/constants';
import { ReactComponent as CaretSvg } from 'components/icons/caret-right.svg';
import { Collapse } from 'antd';
import { useTemplateTitles } from './template-name-collapse-items';

interface TemplateTypesProps {
  search: string;
  setLeftBarLoading: Dispatch<SetStateAction<boolean>>;
}

export const TemplateTypes: FC<TemplateTypesProps> = ({ search, setLeftBarLoading }) => {
  const [activeKey, setActiveKey] = useState<number>(0);
  const items = useTemplateTitles(activeKey, search, setLeftBarLoading);

  const handleCollapseChange = (keys: string | string[]) => {
    if (keys[0]) {
      setActiveKey(parseInt(keys[0]));
    }
  };

  return (
    <Collapse
      defaultActiveKey={0}
      activeKey={activeKey}
      onChange={handleCollapseChange}
      expandIcon={({ isActive }) => (
        <CaretSvg
          rotate={isActive ? 42 : 30}
          style={{ color: COLORS.PRIMARY.GRAY, transition: '0.2s', rotate: isActive ? `90deg` : `0deg` }}
        />
      )}
      prefixCls="title-template"
      accordion
      items={items}
    />
  );
};
