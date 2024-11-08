import { ReactComponent as BarIcon } from 'components/icons/bar-chart.svg';
import { ReactComponent as LineIcon } from 'components/icons/line-chart.svg';
import { ReactComponent as PieIcon } from 'components/icons/pie-chart.svg';
import { ReactComponent as TableIcon } from 'components/icons/table-icon.svg';
import { ReactComponent as TextEditorIcon } from 'components/icons/text-editor.svg';
import { ReactComponent as CardIcon } from 'components/icons/analytic-card.svg';

export const tools = [
  {
    name: 'chart',
    icon: <LineIcon />,
    type: 'line',
    title: 'Chart/Line',
  },
  {
    name: 'chart',
    icon: <PieIcon />,
    type: 'pie',
    title: 'Chart/Pie',
  },
  {
    name: 'chart',
    icon: <BarIcon />,
    type: 'bar',
    title: 'Chart/Bar',
  },
  {
    name: 'table',
    icon: <TableIcon />,
    type: 'table',
    title: 'Table',
  },
  {
    name: 'card',
    icon: <CardIcon />,
    type: 'card',
    title: 'Card',
  },
  {
    name: 'text',
    icon: <TextEditorIcon />,
    type: 'editor',
    title: 'Text/Editor',
  },
];
