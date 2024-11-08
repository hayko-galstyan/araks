import { Graph } from './components/graph';
import { LeftSection } from './left-section';
import { NodeCreateDrawer } from './components/drawers/nodes/create-node';
import { Settings } from './components/settings';
import { NodeDeleteModal } from './components/modals/delete-node';
import { EdgeCreateDrawer } from './components/drawers/edges/add-edge';
import { EdgeDeleteModal } from './components/modals/delete-edge';
import { EdgeViewDrawer } from './components/drawers/edges/edge-view';
import { ToolbarVisualization } from '../../components/tool-bar';
import { ViewEditNodeDrawer } from './components/drawers/nodes/view-edit-node';
import { SearchData } from './components/search/canvas';
import { ShortestPathModal } from './components/modals/shortest-path';
import { GraphInfo } from './components/info';
import { useState } from 'react';
import { FuzzyMatchComponent } from './fuzzy-match/create-modal';

export const ProjectVisualisation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [queryCollapsed, setQueryCollapsed] = useState(false);

  return (
    <div style={{ overflow: 'hidden' }}>
      <Graph callpased={!collapsed ? 0 : queryCollapsed ? 720 : 480} />
      <SearchData collapsed={collapsed} queryCollapsed={queryCollapsed} />
      <ToolbarVisualization />
      <LeftSection
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        queryCollapsed={queryCollapsed}
        setQueryCollapsed={setQueryCollapsed}
      />
      <Settings />
      <NodeCreateDrawer />
      <ViewEditNodeDrawer />
      <NodeDeleteModal />
      <ShortestPathModal />
      <EdgeDeleteModal />
      <EdgeCreateDrawer />
      <EdgeViewDrawer />
      <GraphInfo collapsed={collapsed} queryCollapsed={queryCollapsed} />
      <FuzzyMatchComponent />
    </div>
  );
};