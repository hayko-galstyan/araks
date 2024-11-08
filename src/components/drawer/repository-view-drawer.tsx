import { Drawer } from 'antd';
import { DocumentView } from 'components/document-view';
import { useDocument } from '../layouts/components/document/wrapper';

export const RepositoryViewInfo = () => {
  const { showDocumentDrawer, setShowDocumentDrawer } = useDocument();
  const closable = true;
  return (
    <Drawer
      open={!!showDocumentDrawer}
      closable={closable}
      destroyOnClose
      width={'80%'}
      drawerStyle={{
        background: '#F2F2F2',
        boxShadow: '10px 10px 10px 0px rgba(111, 111, 111, 0.10) inset',
      }}
      contentWrapperStyle={{
        boxShadow: 'none',
        left: '10%',
      }}
      bodyStyle={{ padding: '32px 18px 18px' }}
      onClose={() => setShowDocumentDrawer(undefined)}
    >
      <div style={{ height: '100%', position: 'relative' }}>
        {showDocumentDrawer && <DocumentView node={showDocumentDrawer} />}
      </div>
    </Drawer>
  );
};
