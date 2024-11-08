import { useGetDictionary, GET_DICTIONARY_PROPERTY_TYPES } from 'api/dictionary/use-get-dictionary';
import { Select } from '.';
import { RefSelectProps } from 'antd';
import { PropertyTypes } from 'components/form/property/types';
import { PageParameters } from 'api/types';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, ORDER } from 'helpers/constants';
import { GetTypeNodes } from 'api/node/use-get-type-nodes';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { DefaultOptionType } from 'antd/es/select';

type Props = Partial<RefSelectProps> & {
  propertyTypeId?: PropertyTypes;
  isEdit?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  onSelect?: (value: string, key?: string) => void;
  codes?: string;
};

type PropertyDataType = {
  code: PropertyTypes;
  name: string;
};

const editPropertyList = {
  [PropertyTypes.Text]: [
    PropertyTypes.Text,
    PropertyTypes.Date,
    PropertyTypes.DateTime,
    PropertyTypes.Decimal,
    PropertyTypes.Integer,
    PropertyTypes.URL,
    PropertyTypes.Boolean,
    PropertyTypes.Location,
    PropertyTypes.Connection,
    PropertyTypes.ENUM,
  ],
  [PropertyTypes.Date]: [PropertyTypes.Text, PropertyTypes.Date, PropertyTypes.DateTime],
  [PropertyTypes.DateTime]: [PropertyTypes.Text, PropertyTypes.Date, PropertyTypes.DateTime],
  [PropertyTypes.Integer]: [PropertyTypes.Text, PropertyTypes.Decimal, PropertyTypes.ENUM, PropertyTypes.Integer],
  [PropertyTypes.Decimal]: [PropertyTypes.Text, PropertyTypes.Decimal, PropertyTypes.Integer],
  [PropertyTypes.URL]: [PropertyTypes.Text, PropertyTypes.URL],
  [PropertyTypes.Boolean]: [PropertyTypes.Text, PropertyTypes.Boolean],
  [PropertyTypes.Location]: [PropertyTypes.Text, PropertyTypes.Location],
  [PropertyTypes.Connection]: [PropertyTypes.Text, PropertyTypes.Connection],
  [PropertyTypes.IMAGE_URL]: [PropertyTypes.IMAGE_URL],
  [PropertyTypes.Document]: [PropertyTypes.Document],
  [PropertyTypes.ENUM]: [PropertyTypes.Text, PropertyTypes.Integer, PropertyTypes.ENUM],
  [PropertyTypes.RichText]: [PropertyTypes.RichText],
};

const initPageData: PageParameters = {
  page: DEFAULT_PAGE_NUMBER,
  size: DEFAULT_PAGE_SIZE,
  sortOrder: ORDER.DESC,
  filters: [],
};

export const PropertyDataTypeSelect = ({ isEdit, onSelect, codes, ...props }: Props) => {
  const { nodeTypeId } = useDataSheetWrapper();

  const { count: dataCount, isFetched } = GetTypeNodes(initPageData, nodeTypeId, {
    enabled: !!props.propertyTypeId,
  });

  const { data } = useGetDictionary<PropertyDataType[]>(
    { url: GET_DICTIONARY_PROPERTY_TYPES, codes },
    {
      select: (data: { data: PropertyDataType[] }) => {
        if (props.propertyTypeId && dataCount) {
          return {
            data: data.data.map((item) => ({
              ...item,
              disabled: isEdit
                ? !editPropertyList[props.propertyTypeId || PropertyTypes.Text].includes(item.code)
                : false,
            })),
          };
        }
        return isEdit ? { data: data.data.filter((item) => item.code !== PropertyTypes.Connection) } : data;
      },
      enabled: (props.propertyTypeId && isFetched) || !props.propertyTypeId,
    }
  );

  const handleSelect = (value: unknown, option: DefaultOptionType) => {
    onSelect?.(value as string, option.value as string);
  };

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Please select"
      fieldNames={{ value: 'code', label: 'name' }}
      options={data}
      onSelect={handleSelect}
      {...props}
    />
  );
};
