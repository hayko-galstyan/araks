import { COLORS } from 'helpers/constants';
import { StyledCollapse } from 'components/collapse/style';
import { Extra } from 'pages/project-perspectives/components/section/collapse/use-panels/components/extra';
import { TreeView } from '../../topology/tree-view';
import { ReactComponent as CaretSvg } from 'components/icons/caret-right.svg';
import React, { Dispatch, SetStateAction, useMemo } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import { EmptyList } from 'components/empty';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';
import { ITemplate } from 'api/project-templates/use-get-template-types';
import { useTemplateData } from './hooks/use-template-data';
import { useCollapseHandling } from './hooks/use-collapse-handling';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { useTemplateEffects } from './hooks/use-template-effects';

type Props = React.FC<{
  index: number;
  rows: ITemplate[];
  activeKeyTitle: number;
  setLeftBarLoading: Dispatch<SetStateAction<boolean>>;
}>;

const TextTitle = styled.div<{ isTemplateEditPage: boolean }>`
  width: ${(props) => (props.isTemplateEditPage ? '200px' : '30vw')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TemplateTypeItem: Props = ({ index, rows, activeKeyTitle, setLeftBarLoading }) => {
  const isTemplateEditPage = useIsTemplateEditPage();
  const { activeKey, handleCollapseChange } = useCollapseHandling();
  const { template } = useTemplateData(activeKey, index, activeKeyTitle, rows, setLeftBarLoading);
  const { setNodes, setEdges, view_template, setTemplatePreviewData, graph_preview, ...params } = useSchema();

  useTemplateEffects(isTemplateEditPage, template, graph_preview, params);

  const items = useMemo(
    () =>
      rows?.map((t: ITemplate, i: number) => ({
        key: i,
        label: (
          <Tooltip title={t.name} placement="right">
            <TextTitle isTemplateEditPage={isTemplateEditPage}>{t.name}</TextTitle>
          </Tooltip>
        ),
        extra: activeKey === i ? <Extra id={`${t.id}`} /> : undefined,
        children: <TreeView nodes={t.nodes} />,
      })),
    [activeKey, isTemplateEditPage, rows]
  );

  return (
    <>
      <StyledCollapse
        activeKey={activeKey}
        onChange={handleCollapseChange}
        items={items?.length ? items : [{ key: '0', children: <EmptyList text={'The template section is empty'} /> }]}
        defaultActiveKey={0}
        accordion
        expandIcon={({ isActive }) => (
          <CaretSvg
            rotate={isActive ? 90 : 0}
            style={{
              rotate: isActive ? '34deg' : '110deg',
              transition: 'all 0.3s,visibility 0s',
              color: COLORS.PRIMARY.GRAY,
            }}
          />
        )}
      />
    </>
  );
};
