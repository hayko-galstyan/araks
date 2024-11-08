import React, { useCallback, useMemo, useState } from 'react';
import { Button, Dropdown, Menu, Divider } from 'antd';
import { LayoutWrapper } from './style';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { ReactComponent as RadialSvg } from './icons/radial.svg';
import { ReactComponent as ConcentricSvg } from './icons/concentric.svg';
import { ReactComponent as CircularSvg } from './icons/circular.svg';
import { ReactComponent as GridSvg } from './icons/grid.svg';
import { LayoutConfig, LayoutType } from './types';
import { gpuEnabled, createCombos } from 'components/layouts/components/visualisation/helpers/utils';

export const LayoutComponent: React.FC<{ isDocument?: boolean }> = ({ isDocument }) => {
  const { graph } = useGraph() || {};
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('radial');

  const setLayout = useCallback(
    (layout: LayoutType) => {
      if (graph) {
        setSelectedLayout(layout);
        const params = { type: layout };
        const layoutConfig: LayoutConfig = {
          concentric: {
            maxLevelDiff: 0.5,
            sortBy: 'topology',
            edgeLength: 10,
            preventOverlap: true,
            nodeSize: 20,
          },
          grid: {
            begin: [0 - window.innerWidth / 2, 148 - window.innerHeight / 2],
            preventOverlap: true,
            preventOverlapPadding: 20,
            nodeSize: 20,
            condense: false,
            rows: 5,
            cols: 5,
            sortBy: 'topology',
            workerEnabled: true,
          },
          circular: {
            ordering: 'topology',
            radius: graph.getNodes().length * 10,
          },
          radial: {
            type: 'gForce',
            center: [window.innerWidth / 2, window.innerHeight / 2],
            linkDistance: 100,
            nodeStrength: 600,
            edgeStrength: 200,
            nodeSize: 20,
            workerEnabled: true,
            gpuEnabled: gpuEnabled,
          },
        };

        graph.updateLayout(
          { ...params, ...layoutConfig[layout] },
          'center',
          { x: window.innerWidth / 2, y: window.innerHeight / 2 },
          true
        );
      }
    },
    [graph]
  );

  const layoutIcons: Record<LayoutType, JSX.Element> = useMemo(
    () => ({
      radial: <RadialSvg />,
      concentric: <ConcentricSvg />,
      grid: <GridSvg />,
      circular: <CircularSvg />,
    }),
    []
  );

  const menu = (
    <Menu
      style={{
        gap: '0.4rem',
        display: 'flex',
        padding: '12px',
        flexDirection: 'column',
      }}
    >
      {(['radial', 'concentric', 'grid', 'circular'] as LayoutType[]).map((layout, index) => (
        <>
          <Menu.Item
            key={index}
            onClick={() => setLayout(layout)}
            style={{ backgroundColor: layout === selectedLayout ? '#f0f0f0' : 'transparent', padding: 0 }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.4rem 4px',
                color: ' #414141',
                fontSize: '20px',
                fontWeight: 500,
                letterSpacing: '1.4px',
              }}
            >
              {layoutIcons[layout]} {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </div>
            {index < 3 ? <Divider style={{ margin: 0, borderBottom: '1px solid #C2C5D3' }} /> : <></>}
          </Menu.Item>
        </>
      ))}
    </Menu>
  );

  return (
    <LayoutWrapper isDocument={isDocument}>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button className="layout" style={{ display: 'flex' }} icon={layoutIcons[selectedLayout]}>
          {selectedLayout.charAt(0).toUpperCase() + selectedLayout.slice(1)}
        </Button>
      </Dropdown>
      <Button className="combo" onClick={() => createCombos(graph)}>
        Combo
      </Button>
    </LayoutWrapper>
  );
};
