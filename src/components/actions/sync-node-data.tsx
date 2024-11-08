import { SyncOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { useCreateSyncProperties } from 'api/project-node-type-property/use-sync-properties';

export const SyncNodeData = () => {
  const { mutate: createSyncPropertiesFn } = useCreateSyncProperties('data-sheet');

  const onHandleSyncProperties = () => {
    createSyncPropertiesFn();
  };

  return (
    <Tooltip title="When you click this icon, it will sync your node data. If they don't have the same structure, it will adjust accordingly.">
      <SyncOutlined onClick={onHandleSyncProperties} style={{ fontSize: '24px', cursor: 'pointer' }} />
    </Tooltip>
  );
};
