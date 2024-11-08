import React, { useState } from 'react';
import { Col, Drawer, Input, Menu, Row, Space, Typography } from 'antd';
import { ReactComponent as Helpicon } from 'components/help/help.svg';
import { ProjectsFolders } from './projects-and-folders';
import { OverviewSection } from './overview';
import { SchemaSection } from './schema-section';
import { DataSheetSection } from './data-sheet';
import { VisualizationSection } from './visualization';
import { Perspective } from './perspective';
import { SearchOutlined } from '@ant-design/icons';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { Import } from './import';
const { Text } = Typography;

const spanStyle = {
  fontWeight: '600',
  fontSize: '16px',
};
const spanStyleHeader = {
  fontWeight: '700',
  fontSize: '18px',
};
const HelpDrawer = styled(Drawer)`
  & .ant-drawer-body {
    padding: 0;
    overflow-x: hidden;
  }
`;
const items = [
  {
    label: <span style={spanStyleHeader}>Home Page</span>,
    subMenuKey: 'sub1',
    items: [
      {
        label: <span style={spanStyle}>Manage Project</span>,
        subMenuKey: 'sub1-1',
      },
      {
        label: <span style={spanStyle}>Manage Folders</span>,
        subMenuKey: 'sub1-2',
      },
    ],
  },
  {
    label: <span style={spanStyleHeader}>Overview</span>,
    subMenuKey: 'sub4',
    items: [
      {
        label: <span style={spanStyle}>Project Overview</span>,
        subMenuKey: 'sub4-1',
      },
      { label: <span style={spanStyle}>Comments and Likes</span>, subMenuKey: 'sub4-3' },
    ],
  },
  {
    label: <span style={spanStyleHeader}>Schema section</span>,
    subMenuKey: 'sub2',
    items: [
      {
        label: <span style={spanStyle}>Creating and Managing Types</span>,
        subMenuKey: 'sub2-1',
      },
      {
        label: <span style={spanStyle}>Property Management in Schema</span>,
        subMenuKey: 'sub2-2',
      },
      {
        label: <span style={spanStyle}>Node Data Types</span>,
        subMenuKey: 'sub2-6',
      },
      {
        label: <span style={spanStyle}>Connection Management in Schema</span>,
        subMenuKey: 'sub2-3',
      },
      {
        label: <span style={spanStyle}>Connection Property Management in Schema</span>,
        subMenuKey: 'sub2-4',
      },
      {
        label: <span style={spanStyle}>Search Management in Schema</span>,
        subMenuKey: 'sub2-5',
      },
    ],
  },
  {
    label: <span style={spanStyleHeader}>Data sheet section</span>,
    subMenuKey: 'sub3',
    items: [
      {
        label: <span style={spanStyle}>Tabular Node Addition and Connection Managemente</span>,
        subMenuKey: 'sub3-1',
      },
      {
        label: <span style={spanStyle}>Comprehensive Data Handling</span>,
        subMenuKey: 'sub3-2',
      },
    ],
  },
  {
    label: <span style={spanStyleHeader}>Visualization</span>,
    subMenuKey: 'sub5',
    items: [
      {
        label: <span style={spanStyle}>Adding and Connecting New Nodes</span>,
        subMenuKey: 'sub5-1',
      },
      {
        label: <span style={spanStyle}>Node Viewing, Editing, and Deletion</span>,
        subMenuKey: 'sub5-2',
      },
      {
        label: <span style={spanStyle}>Efficient Use of Filters</span>,
        subMenuKey: 'sub5-3',
      },
      { label: <span style={spanStyle}>Queries</span>, subMenuKey: 'sub5-4' },
      { label: <span style={spanStyle}>Styling </span>, subMenuKey: 'sub5-5' },
      { label: <span style={spanStyle}>Modifying or Removing Styles </span>, subMenuKey: 'sub5-6' },
    ],
  },
  {
    label: <span style={spanStyleHeader}>Perspective</span>,
    items: [
      {
        label: <span style={spanStyle}>Tailored Views for Collaborative Flexibility </span>,
        subMenuKey: 'sub6-1',
      },
    ],
  },
  {
    label: <span style={spanStyleHeader}>Import</span>,
    items: [
      {
        label: <span style={spanStyle}>Integrating External Data into Araks</span>,
        subMenuKey: 'sub7-1',
      },
    ],
  },
];
export const Help: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('sub1-1');
  const [search, setSearch] = useState<string>('');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const filteredItems = items
    .map((item) => {
      const itemLabel = typeof item.label === 'string' ? item.label : item.label.props.children;
      const filteredSubItems = item.items
        ? item.items.filter((subItem) => {
            const subItemLabel = typeof subItem.label === 'string' ? subItem.label : subItem.label.props.children;

            return subItemLabel.toLowerCase().includes(search.toLowerCase());
          })
        : [];
      if (filteredSubItems.length > 0 || itemLabel.toLowerCase().includes(search.toLowerCase())) {
        return {
          ...item,
          items: filteredSubItems,
        };
      }
      return null;
    })
    .filter(Boolean);
  const [isSearching, setIsSearching] = useState(false);
  const handleMenuItemClick = (key: string) => {
    if (key !== activeMenuItem) {
      setActiveMenuItem(key);
    }
  };
  return (
    <Space>
      <Helpicon onClick={showDrawer} style={{ cursor: 'pointer' }} />
      <HelpDrawer width={'55%'} closable={false} onClose={onClose} visible={open}>
        <Row gutter={[8, 8]}>
          <Col span={8} style={{ padding: 0 }}>
            <Row style={{ borderBottom: `1px solid ${COLORS.PRIMARY.GRAY_LIGHT}`, padding: '18px' }}>
              <Col span={5}>
                <Text strong style={{ margin: 0, color: '#232F6A', cursor: 'pointer' }}>
                  Help
                </Text>
              </Col>
              <Col span={18}>
                <Input
                  prefix={<SearchOutlined style={{ fontSize: '18px', color: '#C3C3C3' }} />}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsSearching(e.target.value.length >= 3);
                  }}
                  placeholder="Search"
                  style={{ borderColor: '#C3C3C3', fontSize: '15px' }}
                />
              </Col>
            </Row>
            <Menu
              onClick={({ key }) => handleMenuItemClick(key)}
              defaultOpenKeys={['sub1', 'sub1-1']}
              defaultSelectedKeys={[activeMenuItem]}
              mode="inline"
              style={{
                overflowY: 'auto',
                maxHeight: 'calc(100vh - 64px)',
                borderInlineEnd: 'none',
              }}
            >
              {filteredItems.map(
                (item) =>
                  item && (
                    <Menu.SubMenu key={item.subMenuKey} title={item.label}>
                      {item.items.map((subItem) => (
                        <Menu.Item
                          onClick={({ key }) => handleMenuItemClick(key)}
                          key={subItem.subMenuKey}
                          style={{ background: isSearching ? '#EDE06D' : '' }}
                        >
                          {subItem.label}
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  )
              )}
            </Menu>
          </Col>
          <Col
            span={16}
            style={{
              padding: 0,
              background: 'linear-gradient(122deg, rgba(241, 242, 244, 0.90) 3.09%, rgba(255, 255, 255, 0.80) 99.26%) ',
              boxShadow: '-4px -4px 6px 0px rgba(65, 65, 65, 0.08)',
              overflowX: 'hidden',
            }}
          >
            <ProjectsFolders activeMenuItem={activeMenuItem} />
            <OverviewSection activeMenuItem={activeMenuItem} />
            <SchemaSection activeMenuItem={activeMenuItem} />
            <DataSheetSection activeMenuItem={activeMenuItem} />
            <VisualizationSection activeMenuItem={activeMenuItem} />
            <Perspective activeMenuItem={activeMenuItem} />
            <Import activeMenuItem={activeMenuItem} />
          </Col>
        </Row>
      </HelpDrawer>
    </Space>
  );
};
