import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { MainActionButton } from './main-action-button';
import { DownloadFile } from './utils';
import { useLocalStorageGet } from 'hooks/use-local-storage-get';
import { AUTH_KEYS } from 'helpers/constants';
import { useGetProjectInfo } from 'api/projects/use-get-project-info';
import { ActionProps } from './type';
import { message } from 'antd';

interface IDownloadActionProps extends ActionProps {
  nodeTypeIds: string[];
}

export const DownloadAction = ({ nodeTypeIds, ...props }: IDownloadActionProps) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { data: projectData } = useGetProjectInfo({ id: params.id }, { enabled: !!params.id });
  const token = useLocalStorageGet<string>(AUTH_KEYS.TOKEN, '');
  const handleDownload = async () => {
    if (nodeTypeIds.length > 35) {
      message.info('Please select maximum 35 types');
    } else {
      if (nodeTypeIds?.length) {
        setLoading(true);
        await DownloadFile(nodeTypeIds, false, token, '', projectData?.title);
        setLoading(false);
      }
    }
  };

  return (
    <MainActionButton
      disabled={loading}
      helpText="Export Data"
      {...props}
      icon={<UploadOutlined />}
      onClick={handleDownload}
    />
  );
};
