import { Text } from 'components/typography';
import { ReactComponent as RemoveIcon } from '../../icons/remove.svg';
import { SyncOutlined } from '@ant-design/icons';

export const items = [
  {
    key: 'update',
    name: 'Update',
    label: <Text style={{ fontSize: '14px' }}>Update</Text>,
    icon: <SyncOutlined style={{ fontSize: 14 }} />,
  },
  {
    key: 'detach',
    name: 'Detach',
    label: <Text style={{ fontSize: '14px' }}>Delete</Text>,
    icon: <RemoveIcon />,
  },
];
