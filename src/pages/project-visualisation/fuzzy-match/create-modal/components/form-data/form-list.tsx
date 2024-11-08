import React from 'react';
import { Col, Divider, Form } from 'antd';
import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { useGetPropertyOptions } from '../../hooks/use get-property-options';
import { MinusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { SelectPropertyFormItem } from './select-property-form-item';
import { radioPropertyFormItem } from './radio-property-form-item';
import { StyledAddButton } from '../../../../components/buttons/styles';
import { PlusAction } from 'components/actions/plus';
import { ProjectTypePropertyReturnData } from 'api/types';

export enum ItemName {
  Source,
  Target,
}

const RenderRemoveCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const calcHeight = () => {
  const elem: HTMLDivElement | null = document.querySelector('.left-section');

  if (elem) {
    const getHeight = (element: HTMLDivElement | null) => element?.clientHeight ?? 0;

    const heightByClassNames = (elements: string[]) => elements.map((e) => getHeight(document.querySelector(e)));

    const [modalHeight, headerHeight, footerHeight] = heightByClassNames([
      '#fuzzy-property',
      '.header-section',
      '.footer-section',
    ]);

    elem.style.height = `${modalHeight - headerHeight - footerHeight - 32}px`;
  }
};

export const PropertyItems: React.FC = () => {
  const form = Form.useFormInstance();
  const sourceId = Form.useWatch('sourceId', { preserve: true });
  const targetId = Form.useWatch('targetId', { preserve: true });

  const { data: sourceProperties } = useGetProjectNodeTypeProperties(sourceId, {
    enabled: !!sourceId,
  });

  const { data: targetProperties } = useGetProjectNodeTypeProperties(targetId, {
    enabled: !!targetId,
  });

  const sourcePropertiesOption = useGetPropertyOptions({
    properties: sourceProperties ?? [],
    itemName: ItemName.Source,
  });

  const targetPropertiesOption = useGetPropertyOptions({
    properties: targetProperties ?? [],
    itemName: ItemName.Target,
  });
  const selectionChangeHandler = (id: string, name: (string | number)[]) => {
    const getEdgeData = (property: ProjectTypePropertyReturnData | undefined) => ({
      id: property?.id,
      name: property?.name,
      type: property?.ref_property_type_id,
    });

    if (name[1] === 'sourceId') {
      const edge = getEdgeData(sourceProperties?.find((p) => p.id === id));

      const edgeProperties = form.getFieldValue('source_property');

      if (edgeProperties) {
        const values = (edgeProperties as ProjectTypePropertyReturnData[]).filter((s, i) => i !== name[0]);
        form.setFieldValue(`source_property`, [...values, edge]);
      } else {
        form.setFieldValue(`source_property`, [edge]);
      }
    } else {
      const edge = getEdgeData(targetProperties?.find((p) => p.id === id));

      const edgeProperties = form.getFieldValue('target_property');

      if (edgeProperties) {
        const values = (edgeProperties as ProjectTypePropertyReturnData[]).filter((s, i) => i !== name[0]);
        form.setFieldValue(`target_property`, [...values, edge]);
      } else {
        form.setFieldValue(`target_property`, [edge]);
      }
    }
  };

  return (
    <>
      <Form.List name={'matchList'} initialValue={[null]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ name, ...params }) => (
              <>
                {radioPropertyFormItem(name, !sourceId)}
                <SelectPropertyFormItem
                  name={[name, 'sourceId']}
                  label={'Source Property'}
                  options={sourcePropertiesOption}
                  disabled={!sourceId}
                  onChange={selectionChangeHandler}
                />
                <SelectPropertyFormItem
                  name={[name, 'targetId']}
                  label={'Target Property'}
                  options={targetPropertiesOption}
                  disabled={!targetId}
                  sourceProperties={sourceProperties}
                  onChange={selectionChangeHandler}
                />
                {fields.length > 1 && (
                  <RenderRemoveCol offset={1}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </RenderRemoveCol>
                )}
              </>
            ))}

            {fields.length < 3 && (
              <>
                <Divider style={{ color: '#E0E0E0' }} />
                <Col offset={1} span={3}>
                  <StyledAddButton
                    onClick={() => {
                      add(null);
                      calcHeight();
                    }}
                    block
                  >
                    <PlusAction /> Add
                  </StyledAddButton>
                </Col>
              </>
            )}
          </>
        )}
      </Form.List>
    </>
  );
};
