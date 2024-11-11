import {
  BarChartOutlined,
  CreditCardOutlined,
  IdcardOutlined,
  LineChartOutlined,
  PieChartOutlined,
  TableOutlined,
} from '@ant-design/icons';

export const tools = [
  {
    name: 'chart',
    icon: <LineChartOutlined style={{ fontSize: 30 }} />,
    type: 'line',
    title: 'Chart/Line',
  },
  {
    name: 'chart',
    icon: <BarChartOutlined style={{ fontSize: 30 }} />,
    type: 'bar',
    title: 'Chart/Bar',
  },
  {
    name: 'chart',
    icon: <PieChartOutlined style={{ fontSize: 30 }} />,
    type: 'pie',
    title: 'Chart/Pie',
  },

  {
    name: 'table',
    icon: <TableOutlined style={{ fontSize: 30 }} />,
    type: 'table',
    title: 'Table',
  },
  {
    name: 'card',
    icon: <CreditCardOutlined style={{ fontSize: 30 }} />,
    type: 'card',
    title: 'Card',
  },
  {
    name: 'text',
    icon: <IdcardOutlined style={{ fontSize: 30 }} />,
    type: 'editor',
    title: 'Text/Editor',
  },
];
