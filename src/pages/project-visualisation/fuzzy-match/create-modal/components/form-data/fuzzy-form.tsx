import { Form } from 'antd';
import { FC, ReactNode } from 'react';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { FuzzyMatchResponseData, useCreateFuzzyMatch } from 'api/visualisation/use-create-fuzzy-match';
import { Spinning } from 'components/spinning';

export type FuzzyMatchRequest = {
  edgeId: string;
  matchList: {
    exact: boolean;
    fuzzyMatch: number;
    sourceId: string;
    targetId: string;
  }[];
  sourceId: string;
  targetId: string;
};

export const FuzzyMatchForm: FC<{ children: ReactNode }> = ({ children }) => {
  const [form] = Form.useForm();
  const { setFuzzyMatchData } = useGraph() || {};

  const { mutate, isLoading } = useCreateFuzzyMatch({
    onSuccess: (data) => {
      setFuzzyMatchData(data as FuzzyMatchResponseData[]);
    },
  });

  const { startFuzzyPreviewModal } = useGraph() || {};

  const onFinish = ({ edgeId, matchList, sourceId, targetId }: FuzzyMatchRequest) => {
    startFuzzyPreviewModal();

    const sourceDefaultPropertyId = form.getFieldValue('sourceDefaultPropertyId');
    const targetDefaultPropertyId = form.getFieldValue('targetDefaultPropertyId');

    const request = {
      edgeId,
      matchList,
      sourceId,
      targetId,
      sourceDefaultPropertyId,
      targetDefaultPropertyId,
      newEdge: false,
    };

    mutate(request);
  };

  if (isLoading) return <Spinning />;

  return (
    <Form
      form={form}
      name="fuzzy-property"
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      onFinish={onFinish}
      style={{ height: '100%' }}
    >
      {children}
    </Form>
  );
};
