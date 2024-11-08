import { FC } from 'react';
import { Col } from 'antd';
import { SecondaryText } from 'components/typography';
import styled from 'styled-components';
import { COLORS } from 'helpers/constants';

type PropertyInfoColumnProps = {
  label: string | undefined;
  type: string | undefined;
  value: string;
};

const PropertyTypeColumn = styled(Col)`
  display: flex;
  gap: 0.6rem;

  .ant-typography {
    color: ${COLORS.PRIMARY.GRAY};
  }
`;

const PropertyValueColumn = styled(Col)`
  .ant-typography {
    font-size: 20px;
  }
`;

export const PropertyInfoColumn: FC<PropertyInfoColumnProps> = ({ label, type, value }) => (
  <>
    <PropertyTypeColumn span={24}>
      <SecondaryText>{label}</SecondaryText>
      <SecondaryText>({type})</SecondaryText>
    </PropertyTypeColumn>
    <PropertyValueColumn span={24}>
      <SecondaryText>{value}</SecondaryText>
    </PropertyValueColumn>
  </>
);
