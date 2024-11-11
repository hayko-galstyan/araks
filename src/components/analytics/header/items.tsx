import { Text } from 'components/typography';
import { SyncOutlined, DeleteOutlined, AlignCenterOutlined } from '@ant-design/icons';
import { AnalyticActionTypes } from 'helpers/constants';

const { UPDATE, REMOVE, TO_BE_CENTER } = AnalyticActionTypes;

export const items = [
  {
    key: UPDATE,
    name: UPDATE,
    label: <Text style={{ fontSize: 12 }}>Update</Text>,
    icon: <SyncOutlined style={{ fontSize: 12 }} />,
  },
  {
    key: TO_BE_CENTER,
    name: TO_BE_CENTER,
    label: <Text style={{ fontSize: 12 }}>To Be Center</Text>,
    icon: <AlignCenterOutlined style={{ fontSize: 12 }} />,
  },
  {
    key: REMOVE,
    name: REMOVE,
    label: <Text style={{ fontSize: 12 }}>Remove</Text>,
    icon: <DeleteOutlined style={{ fontSize: 12 }} />,
  },
];
