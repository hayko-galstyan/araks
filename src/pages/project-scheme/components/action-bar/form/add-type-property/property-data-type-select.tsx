import { useGetDictionary, GET_DICTIONARY_PROPERTY_TYPES } from 'api/dictionary/use-get-dictionary';
import { RefSelectProps } from 'antd';
import { PropertyTypes } from 'components/form/property/types';
import { PageParameters } from 'api/types';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE, ORDER } from 'helpers/constants';
import { GetTypeNodes } from 'api/node/use-get-type-nodes';
import { Select } from 'components/select';
import { useIsTemplateEditPage } from 'hooks/use-is-template-page';

type Props = Partial<RefSelectProps> & { propertyTypeId?: PropertyTypes; isEdit?: boolean; nodeTypeId: string };

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
  ],
  [PropertyTypes.Date]: [PropertyTypes.Text, PropertyTypes.Date, PropertyTypes.DateTime],
  [PropertyTypes.DateTime]: [PropertyTypes.Text, PropertyTypes.Date, PropertyTypes.DateTime],
  [PropertyTypes.Integer]: [PropertyTypes.Text, PropertyTypes.Decimal, PropertyTypes.Integer],
  [PropertyTypes.Decimal]: [PropertyTypes.Text, PropertyTypes.Decimal, PropertyTypes.Integer],
  [PropertyTypes.URL]: [PropertyTypes.Text, PropertyTypes.URL],
  [PropertyTypes.Boolean]: [PropertyTypes.Text, PropertyTypes.Boolean],
  [PropertyTypes.Location]: [PropertyTypes.Text, PropertyTypes.Location],
  [PropertyTypes.Connection]: [PropertyTypes.Text, PropertyTypes.Connection],
  [PropertyTypes.IMAGE_URL]: [PropertyTypes.IMAGE_URL],
  [PropertyTypes.Document]: [PropertyTypes.Document],
  [PropertyTypes.ENUM]: [PropertyTypes.ENUM],
  [PropertyTypes.RichText]: [
    PropertyTypes.RichText,
    // PropertyTypes.Text,
    // PropertyTypes.Date,
    // PropertyTypes.DateTime,
    // PropertyTypes.Decimal,
    // PropertyTypes.Integer,
    // PropertyTypes.URL,
    // PropertyTypes.Boolean,
    // PropertyTypes.Location,
  ],
};
const initPageData: PageParameters = {
  page: DEFAULT_PAGE_NUMBER,
  size: DEFAULT_PAGE_SIZE,
  sortOrder: ORDER.DESC,
  filters: [],
};

/**
 * Property Data type selection
 * @param props
 * @returns
 */
export const PropertyDataTypeSelectSchema = ({ isEdit, nodeTypeId, ...props }: Props) => {
  const isTemplateEditPage = useIsTemplateEditPage();
  const { count: dataCount, isFetched } = GetTypeNodes(initPageData, nodeTypeId, {
    enabled: !isTemplateEditPage && !!props.propertyTypeId,
  });

  const { data } = useGetDictionary<PropertyDataType[]>(
    { url: GET_DICTIONARY_PROPERTY_TYPES, codes: undefined },
    {
      select: (data: { data: PropertyDataType[] }) => {
        if (props.propertyTypeId) {
          if (isTemplateEditPage || dataCount) {
            return {
              data: data.data.map((item) => ({
                ...item,
                disabled: !editPropertyList[props.propertyTypeId || PropertyTypes.Text].includes(item.code),
              })),
            };
          }
        }
        return isEdit ? { data: data.data.filter((item) => item.code !== PropertyTypes.Connection) } : data;
      },
      enabled: isTemplateEditPage || (props.propertyTypeId && isFetched) || !props.propertyTypeId,
    }
  );

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="Please select"
      fieldNames={{ value: 'code', label: 'name' }}
      options={data}
      {...props}
    />
  );
};
