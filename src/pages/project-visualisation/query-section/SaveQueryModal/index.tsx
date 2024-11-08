import { Row } from 'antd';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { Text } from 'components/typography';
import { Input } from 'components/input';
import { getQueryFilterType, QueryFilterTypes } from 'components/select/queries-select';
import { getQueryValue } from 'helpers/utils';
import { useCreateQuery } from 'api/query-history/use-create-history';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { TreeConnectionType, TreeNodeType } from 'pages/data-sheet/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
const ErrorMessage = styled.text`
  & {
    color: red;
    font-size: 18px;
  }
`;
const Label = styled.text`
  & {
    color: #c5c5c5;
    font-size: 16px;
    font-weight: 600;
    font-family: 'Rajdhani';
  }
`;

type FormPropsValues = {
  name: string;
  description: string;
  operator: 'AND' | 'OR';
  queryArr: Array<{
    type: string;
    label: string;
    query_history_node_type_id?: string;
    query: {
      delete_type?: {
        query_history_node_property_id?: string;
        type: string;
        action: string;
        multiple: boolean;
        value: '';
      };
    };
  }>;
};

type FormQueryValues = {
  operator: 'AND' | 'OR';
  queries: (
    | TreeNodeType
    | (TreeConnectionType & {
        type: QueryFilterTypes;
        typeText: string;
      })
  )[];
};

type Props = {
  isModalOpen: boolean;
  closePreview?: () => void;
  setIsModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  defaultformData: FormQueryValues;
  setActiveQuerisID?: (activeQuerisID: { name: string; id: string } | null) => void;
  setQueryCollapsed?: Dispatch<SetStateAction<boolean>>;
};

export const SaveQueryModal = ({
  isModalOpen,
  setIsModalOpen,
  closePreview,
  defaultformData,
  setQueryCollapsed,
  setActiveQuerisID,
}: Props) => {
  const params = useParams();

  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useCreateQuery(params.id ? params.id : '');

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const SaveQuery = () => {
    let formData: FormPropsValues = {
      name: name,
      description: '',
      operator: 'OR',
      queryArr: [],
    };

    if (defaultformData !== undefined) {
      const dataToMap = defaultformData;
      let queryArr;
      if (defaultformData.operator === 'AND') {
        queryArr = dataToMap.queries
          // .filter(Boolean)
          .map((query) => ({
            type: query.isConnectionType ? 'relation' : 'node',
            label: query.labelValue,
            query_history_node_type_id: query.isConnectionType ? undefined : query.parent_id ?? query.id,
            query_history_edge_type_id: query.isConnectionType ? query.parent_id ?? query.id : undefined,
            ...((query.isConnectionType && query.depth !== 3) || (!query.isConnectionType && query.depth === 1)
              ? { action: getQueryFilterType(query.type) }
              : {}),
            ...(query.isConnectionType && query.depth !== 1 ? { project_edge_type_id: query.id } : {}),
            query:
              (query.isConnectionType && query.depth === 3) || (!query.isConnectionType && query.depth === 2)
                ? dataToMap.queries.reduce((acc, item, index) => {
                    if (item.depth === query.depth && item.labelValue === query.labelValue) {
                      delete dataToMap.queries[index];

                      return {
                        ...acc,
                        [item.name]: {
                          query_history_node_property_id: query.isConnectionType ? undefined : query.id,
                          query_history_edge_property_id: query.isConnectionType ? query.id : undefined,
                          type: item.ref_property_type_id,
                          action: getQueryFilterType(item.type),
                          multiple: item.multiple_type,
                          value: getQueryValue(item),
                          isConnectionType: query.isConnectionType,
                        },
                      };
                    }
                    return acc;
                  }, {})
                : {},
          }))
          .filter((item) => (!item.action && Object.keys(item.query).length) || item.action);
      } else {
        queryArr = defaultformData.queries.map((query) => ({
          type: query.isConnectionType ? 'relation' : 'node',
          label: query.labelValue,
          query_history_node_type_id: query.isConnectionType ? undefined : query.parent_id ?? query.id,
          query_history_edge_type_id: query.isConnectionType ? query.parent_id ?? query.id : undefined,
          ...((query.isConnectionType && query.depth !== 3) || (!query.isConnectionType && query.depth === 1)
            ? { action: getQueryFilterType(query.type) }
            : {}),
          ...(query.isConnectionType && query.depth !== 1 ? { project_edge_type_id: query.id } : {}),
          query:
            (query.isConnectionType && query.depth === 3) || (!query.isConnectionType && query.depth === 2)
              ? {
                  [query.name]: {
                    query_history_node_property_id: query.isConnectionType ? undefined : query.id,
                    id: query.isConnectionType ? query.id : undefined,
                    type: query.ref_property_type_id,
                    action: getQueryFilterType(query.type),
                    multiple: query.multiple_type,
                    value: getQueryValue(query),
                  },
                }
              : {},
        }));
      }
      formData = { name: name, description: '', operator: defaultformData.operator, queryArr: queryArr };
      if (formData.queryArr.length > 0) {
        mutate(formData, {
          onSuccess: (response) => {
            setActiveQuerisID && setActiveQuerisID({ name: name, id: response.id });
            setQueryCollapsed && setQueryCollapsed(true);
          },
        });
      }
    }

    setIsModalOpen(false);
    if (closePreview) closePreview();
  };
  useEffect(() => {
    if (name.length === 0) {
      setError('Title is required');
    } else if (name.length < 3) {
      setError('The minimum length for this field is 3 characters');
    } else if (name.length > 30) {
      setError('The maximum length for this field is 30 characters');
    } else setError(null);
  }, [name]);

  return (
    <>
      <Modal open={isModalOpen} footer={false} closable={false} className="project-modal">
        <VerticalSpace>
          <Text>Save Queries</Text>

          <Row>
            <Label>Queries name</Label>
            {defaultformData !== null && (
              <Input defaultValue="" value={name} onChange={(e) => setName(e.target.value)} />
            )}

            {error !== null && <ErrorMessage>{error}</ErrorMessage>}
          </Row>
          <Button block onClick={SaveQuery} type="primary">
            Save
          </Button>
          <Button block type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
    </>
  );
};
