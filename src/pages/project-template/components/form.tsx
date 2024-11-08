import { Form, Spin } from 'antd';
import { FC, ReactNode, useState } from 'react';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { ProjectCreateTemplate, useSaveAsTemplate } from 'api/project-templates/use-save-as-template';
import { SaveTemplateSuccessModal } from './success-message';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from 'helpers/constants';

type Nodes = { id: string; position: () => { x: number; y: number } }[];
type Edges = { id: string }[];

const edge_ids = (edges: Edges) => edges.map((e) => e.id);

const nodes_ids = (nodes: Nodes) => nodes.map((n) => ({ id: n.id, fx: n.position().x, fy: n.position().y }));

export const FormTemplate: FC<{ children: ReactNode }> = ({ children }) => {
  const [form] = Form.useForm();
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const redirectToSchema = () => navigate(PATHS.PROJECT_SCHEME.replace(':id', id || ''));

  const { graph } = useSchema();

  const { mutate, isLoading } = useSaveAsTemplate({
    onSuccess: () => {
      setOpenSuccess(true);
    },
  });

  const onFinish = (values: ProjectCreateTemplate) => {
    mutate({ ...values, nodes_ids: nodes_ids(graph.getNodes()), edges_ids: edge_ids(graph.getEdges()) });
  };

  const closeTemplate = () => {
    setOpenSuccess(false);
    redirectToSchema();
  };

  return (
    <Form
      name="template-dorm"
      form={form}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
    >
      <Spin spinning={isLoading}>
      {children}
      </Spin>
      <SaveTemplateSuccessModal open={openSuccess} onClose={closeTemplate} />
    </Form>
  );
};
