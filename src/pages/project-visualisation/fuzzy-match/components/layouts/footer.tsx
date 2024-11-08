import { Col, Form, Row } from 'antd';
import { Button } from 'components/button';
import styled from 'styled-components';
import { useCreateFuzzyMatchGraph } from 'api/visualisation/use-create-fuzzy-match-graph';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';
import { formattedData } from 'components/layouts/components/visualisation/helpers/format-node';
import { initData as initGraphData } from 'components/layouts/components/visualisation/container/initial/nodes';
import { graphRender } from 'components/layouts/components/visualisation/helpers/utils';
import { validateFormItems } from './footer-check-validation';
import { Spinning } from 'components/spinning';
import { NODE_LIMIT } from 'helpers/constants';

export const Footer = styled.div`
  height: 3%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  fill: #f2f2f2;
  box-shadow: rgb(111 111 111 / 18%) 0px -4px 20px;
`;

export const FuzzyMatchFooter = () => {
  const form = Form.useFormInstance();
  const fields = Form.useWatch([]);

  const { fuzzyData, setGraphInfo, graph, openFuzzyPreview, finishFuzzyPreviewModal, finishFuzzyModal } =
    useGraph() || {};

  const { edgeId } = form.getFieldValue([]);

  const { mutate, isLoading } = useCreateFuzzyMatchGraph({
    onSuccess: (data) => {
      const { nodes, edges } = formattedData(data.nodes, data.edges, data.relationsCounts);
      const result = { nodes, edges };
      initGraphData(graph, result);

      setGraphInfo({
        nodeCount: (data.count ?? 0) > NODE_LIMIT ? NODE_LIMIT : data.count,
      });

      graphRender(graph);

      finishFuzzyModal();
      finishFuzzyPreviewModal();
    },
  });

  const saveHandle = () => {
    if (openFuzzyPreview?.isOpened) {
      mutate({ edgeId, data: fuzzyData });
    }
  };

  const onClose = () => {
    if (openFuzzyPreview?.isOpened) {
      finishFuzzyPreviewModal();
    } else {
      finishFuzzyModal();
    }
  };

  if (isLoading) return <Spinning />;

  return (
    <Footer className="footer-section">
      <Row gutter={16} justify="end">
        <Col span={4}>
          <Button style={{ marginRight: 8 }} onClick={onClose} block>
            {openFuzzyPreview?.isOpened ? 'Back' : 'Cancel'}
          </Button>
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            disabled={openFuzzyPreview?.isOpened ? !fuzzyData?.length : validateFormItems(fields)}
            htmlType={openFuzzyPreview?.isOpened ? 'button' : 'submit'}
            block
            onClick={saveHandle}
          >
            {openFuzzyPreview?.isOpened ? 'Save' : 'Next'}
          </Button>
        </Col>
      </Row>
    </Footer>
  );
};
