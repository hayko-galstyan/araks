import { Form, Space } from 'antd';
import { FormInput } from 'components/input';
import { Text } from 'components/typography';

import { Button } from 'components/button';
import { VerticalSpace } from 'components/space/vertical-space';
import { Rule } from 'antd/es/form';
import { UsefulInformationTooltip } from 'components/tool-tip/useful-information-tooltip';
import { EditNodePropertyTypeInfoModal } from 'components/modal/edit-node-property-type-info-modal';
import { FormItem } from '../../form-item';
import { PropertyBasicDetails } from '../../property/property-basic-details';
import { PropertyConnectionDetails } from '../../property/property-connection-details';
import { TypePropertyActionKind } from 'pages/data-sheet/components/table-section/types';
import { useTypeProperty } from 'pages/data-sheet/components/table-section/table-context';
import { PropertyDataTypeSelect } from '../../../select/property-data-type-select';
import { PropertyTypes } from '../../property/types';
import { ConnectionPropertyFormItems } from './connection-property-items';
import { SetCreateConnection } from '../add-type-property-form';
import { PropertyEnumDetails } from '../../property/property-enum-details';
import { Dispatch, SetStateAction } from 'react';
import { ProjectNodeTypePropertyReturnData } from 'api/types';

interface CreateTarget {
  selected?: string | undefined;
  isOpen: boolean;
}
interface Props {
  isEdit?: boolean;
  isConnectionType?: boolean;
  hide: () => void;
  setCreateConnection: SetCreateConnection;
  propertyId: string | undefined;
  setCreateTarget: Dispatch<SetStateAction<CreateTarget | undefined>>;
  data?: ProjectNodeTypePropertyReturnData;
}
export const TypePropertyFormItems = ({
  isEdit = false,
  hide,
  isConnectionType = false,
  propertyId,
  setCreateConnection,
  setCreateTarget,
  data,
}: Props) => {
  const form = Form.useFormInstance();
  const { dispatch } = useTypeProperty();
  const dataType = Form.useWatch('ref_property_type_id', { preserve: true });

  /** this action works only for create */
  const onHandleCancel = () => {
    dispatch({ type: TypePropertyActionKind.ADD_TYPE_CANCEL, payload: { titleText: undefined } });
    hide?.();
    // form.resetFields();
  };

  /** this action works only for edit */
  const onHandleDelete = () => {
    dispatch({ type: TypePropertyActionKind.DELETE_TYPE_START, payload: {} });
    hide?.();
  };
  !isEdit && !isConnectionType &&
    form.setFieldsValue({
      ref_property_type_id: dataType || PropertyTypes.Text,
    });

  const dataSelectItem = (
    <FormItem
      name="ref_property_type_id"
      label="Data type"
      rules={[{ required: true, message: 'Node property data type is required' }]}
      hidden={isConnectionType === true || form.getFieldValue('default_property')}
    >
      <PropertyDataTypeSelect propertyTypeId={dataType} isEdit={isEdit} />
    </FormItem>
  );

  return (
    <>
      <Space size={8}>
        <Text>{isConnectionType ? 'Create Connection type' : isEdit ? 'Edit Property' : 'Add property for type'}</Text>
        <UsefulInformationTooltip infoText="Inherit parent options" />
      </Space>
      {!isConnectionType && dataType === PropertyTypes.Connection && isEdit ? (
        <ConnectionPropertyFormItems
          dataTypeSelect={dataSelectItem}
          setCreateConnection={setCreateConnection}
          setCreateTarget={setCreateTarget}
          hide={hide}
          propertyId={undefined}
          createTarget={undefined}
        />
      ) : (
        <>
          {!form.getFieldValue('default_property') && !data?.default_image && (
            <FormItem
              name="name"
              label={isConnectionType ? 'Connection name' : 'Property name'}
              rules={[
                {
                  required: true,
                  message: isConnectionType ? 'Connection name is required' : 'Property name is required',
                },
                {
                  min: dataType === PropertyTypes.Connection ? 2 : 3,
                  message: `The minimum length for this field is ${
                    dataType === PropertyTypes.Connection ? 2 : 3
                  } characters`,
                },
                { max: 30, message: 'The maximum length for this field is 30 characters' },
                {
                  validator: async (_: Rule, value: string | undefined) => {
                    if (value !== undefined && value !== '') {
                      const regex = /^[a-z][a-z0-9_]*$/;
                      if (!regex.test(value)) {
                        return Promise.reject(
                          'Name must start with a letter and contain only lowercase letters, numbers and underscores'
                        );
                      }
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <FormInput placeholder={isConnectionType ? 'Connection name' : 'Property name'} />
            </FormItem>
          )}
          {!data?.default_image && dataSelectItem}
          <PropertyEnumDetails />
          <PropertyBasicDetails />
          <PropertyConnectionDetails isConnectionType={isConnectionType} />
          <FormItem>
            <VerticalSpace>
              {isEdit ? (
                <EditNodePropertyTypeInfoModal id={data?.id} initPropertyType={dataType} />
              ) : (
                <Button block type="primary" htmlType="submit">
                  Save
                </Button>
              )}
              {isEdit && !data?.default_image ? (
                <Button block type="text" onClick={onHandleDelete} disabled={data?.default_property}>
                  Delete
                </Button>
              ) : (
                <Button block type="text" onClick={onHandleCancel}>
                  Cancel
                </Button>
              )}
            </VerticalSpace>
          </FormItem>
        </>
      )}
    </>
  );
};
