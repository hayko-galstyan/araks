import { Select } from '.';
import { RefSelectProps } from 'antd';
import { ConnectionPropertyTypes } from 'components/form/property/types';
import { removeSymbols } from 'helpers/utils';

const editPropertyList = {
  [ConnectionPropertyTypes.TEXT]: [
    ConnectionPropertyTypes.TEXT,
    ConnectionPropertyTypes.DATE,
    ConnectionPropertyTypes.DATETIME,
    ConnectionPropertyTypes.DECIMAL,
    ConnectionPropertyTypes.INTEGER,
  ],
  [ConnectionPropertyTypes.DATE]: [
    ConnectionPropertyTypes.TEXT,
    ConnectionPropertyTypes.DATE,
    ConnectionPropertyTypes.DATETIME,
  ],
  [ConnectionPropertyTypes.DATETIME]: [
    ConnectionPropertyTypes.TEXT,
    ConnectionPropertyTypes.DATE,
    ConnectionPropertyTypes.DATETIME,
  ],
  [ConnectionPropertyTypes.INTEGER]: [
    ConnectionPropertyTypes.TEXT,
    ConnectionPropertyTypes.DECIMAL,
    ConnectionPropertyTypes.INTEGER,
  ],
  [ConnectionPropertyTypes.DECIMAL]: [
    ConnectionPropertyTypes.TEXT,
    ConnectionPropertyTypes.DECIMAL,
    ConnectionPropertyTypes.INTEGER,
  ],
  [ConnectionPropertyTypes.RICHTEXT]: [ConnectionPropertyTypes.RICHTEXT],
};

type Props = Partial<RefSelectProps> & { propertyTypeId?: ConnectionPropertyTypes };

export const PropertyDataConnectionTypeSelect = ({ propertyTypeId, ...props }: Props) => {
  const data = Object.values(ConnectionPropertyTypes).map((item) => ({
    label: removeSymbols({ input: item, caseType: 'allLowercase'}),
    value: item,
    disabled: propertyTypeId && (!editPropertyList[propertyTypeId].includes(item) as boolean),
  }));
  return <Select style={{ width: '100%' }} placeholder="Please select" options={data} {...props} />;
};
