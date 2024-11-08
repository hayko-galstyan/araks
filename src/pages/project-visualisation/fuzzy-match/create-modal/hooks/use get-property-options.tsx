import { useMemo } from 'react';
import { Space } from 'antd';
import { SecondaryText, Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { ProjectTypePropertyReturnData } from 'api/types';
import { PropertyTypes } from 'components/form/property/types';
import { ManageFuzzyTypeProperty } from '../components/manage-property';
import { editFuzzyPropertyList } from '../components/manage-property/data-types-select';
import { ItemName } from '../components/form-data/form-list';

interface PropertyOptionsProps {
  properties: ProjectTypePropertyReturnData[];
  itemName: ItemName;
}

type PropertyOption = ({ properties }: PropertyOptionsProps) => {
  label: JSX.Element;
  value: string;
}[];

export const useGetPropertyOptions: PropertyOption = ({ properties, itemName }) => {
  return useMemo(
    () =>
      properties
        ?.filter(
          (p) =>
            p.ref_property_type_id !== PropertyTypes.Connection &&
            !p.default_image &&
            (itemName === ItemName.Source ? !p.multiple_type : true) &&
            editFuzzyPropertyList[p.ref_property_type_id as PropertyTypes].length
        )
        .map((item) => {
          const label = (
            <ManageFuzzyTypeProperty
              propertyId={item.id}
              isDefault={item.default_property}
              canSetDefault={
                item.ref_property_type_id === PropertyTypes.Text && item.required_type === true && !item.multiple_type
              }
            >
              <Space>
                <Text color={COLORS.PRIMARY.BLUE}>{`${item.name}`}</Text>
                <SecondaryText color={COLORS.PRIMARY.GRAY}>{`(${item.ref_property_type_id})`}</SecondaryText>
              </Space>
            </ManageFuzzyTypeProperty>
          );

          return {
            label,
            value: item.id,
            type: item.ref_property_type_id,
          };
        }),
    [itemName, properties]
  );
};
