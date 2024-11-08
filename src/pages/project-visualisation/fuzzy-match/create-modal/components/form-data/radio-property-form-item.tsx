import { Col, Radio, Row } from 'antd';
import { FormItem } from 'components/form/form-item';
import { SecondaryText } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { RadioPropertyNumberFormItem } from './radio-property-number-form-tem';
import styled from 'styled-components';

type PropertyRadio = (name: number, disabled: boolean) => JSX.Element;

const ColContainer = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .exact-section {
    margin-bottom: 4px;
  }

  .number-section {
    max-width: 10.8rem;

    .ant-form-item-control-input {
      max-width: 6.8rem;
      margin-left: auto;
    }

    .ant-input-number-group-wrapper {
      background: transparent;
    }
  }
`;

export const radioPropertyFormItem: PropertyRadio = (name, disabled) => (
  <Col span={24} className={disabled ? 'disabled' : ''}>
    <Row>
      <ColContainer offset={1} span={10}>
        <div className="exact-section">
          <FormItem name={[name, 'exact']} rules={[{ required: true, message: 'The field is required' }]}>
            <Radio.Group disabled={disabled}>
              {[true, false].map((value, index) => (
                <Radio key={index} value={value}>
                  <SecondaryText color={COLORS.PRIMARY.GRAY_DARK}>{value ? 'Exact' : 'Fuzzy Match'}</SecondaryText>
                </Radio>
              ))}
            </Radio.Group>
          </FormItem>
        </div>
        <div className="number-section">
          <RadioPropertyNumberFormItem name={name} />
        </div>
      </ColContainer>
    </Row>
  </Col>
);
