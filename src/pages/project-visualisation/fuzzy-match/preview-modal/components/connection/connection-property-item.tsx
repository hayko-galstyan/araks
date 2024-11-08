import { FC, useMemo } from 'react';
import { Col, Form, Row } from 'antd';
import { SecondaryText } from 'components/typography';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { MatchProperty } from 'api/visualisation/use-create-fuzzy-match';
import { useConnectionOptions } from '../../hooks/use-connection-option';
import { PropertyInfoColumn } from './connection-info-column';
import { ReactComponent as CaretSvg } from '../icons/caret.svg';

type Props = FC<{ sourceProperties: MatchProperty[]; targetProperties: MatchProperty[] }>;

type EdgeSelectedProperties = { id?: string; name?: string; type?: string }[];

const PropertyRow = styled(Row)`
  & > * {
    span {
      color: ${COLORS.PRIMARY.BLUE};
    }
  }
`;

const PropertyExactColumn = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;

  .ant-typography {
    font-weight: 500;
  }

  svg path {
    fill: ${COLORS.PRIMARY.GRAY_DARK};
  }
`;

export const ConnectionPropertyItem: Props = ({ sourceProperties, targetProperties }) => {
  const form = Form.useFormInstance();
  const selectedSourceProperties = useMemo(
    () => form.getFieldValue('source_property') as EdgeSelectedProperties,
    [form]
  );
  const selectedTargetProperties = useMemo(
    () => form.getFieldValue('target_property') as EdgeSelectedProperties,
    [form]
  );

  const options = useConnectionOptions(
    sourceProperties,
    targetProperties,
    selectedSourceProperties,
    selectedTargetProperties
  );

  return (
    <>
      {options.map(({ source, target, property_info }, i) => (
        <PropertyRow key={i} gutter={[16, 0]} justify="start">
          <Col span={10}>
            <Row>
              <PropertyInfoColumn label={source.name} type={source.type} value={source.value} />
            </Row>
          </Col>
          <PropertyExactColumn span={3}>
            <SecondaryText>{property_info.text}</SecondaryText>
            <CaretSvg />
          </PropertyExactColumn>
          <Col offset={1} span={10}>
            <Row>
              <PropertyInfoColumn label={target.name} type={target.type} value={target.value} />
            </Row>
          </Col>
        </PropertyRow>
      ))}
    </>
  );
};
