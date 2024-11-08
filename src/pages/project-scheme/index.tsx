import { Space } from 'antd';
import { ActionBar } from './components/action-bar';
import { Schema } from './components/schema';
import { Toolbar } from '../../components/tool-bar';
import { LeftBar } from './components/left-bar';
import { TemplateView } from './components/left-bar/components/template-types/use-template-drawer';

export const ProjectScheme = () => (
  <Space>
    <LeftBar />
    <Schema />
    <ActionBar />
    <TemplateView />
    <Toolbar position="right" />
  </Space>
);
