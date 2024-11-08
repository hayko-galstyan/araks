import { Button, Col, Row } from 'antd';
import { Sort } from 'components/dropdown';
import { ALL_DATA_SORT_BY } from 'components/dropdown/constants';
import { ExpandableInput, SearchText } from 'components/input/expandable-input';
import { DeleteAllDataModal } from 'components/modal/delete-all-data-modal';
import { useSort } from 'context/sort-context';
import { DEFAULT_PAGE_NUMBER } from 'helpers/constants';
import { useIsPublicPage } from 'hooks/use-is-public-page';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { defaultAllDataFilter } from '../right-section-all-data';
import { DownloadAction } from 'components/actions';
import { ReactComponent as SourceSvg } from 'components/icons/source.svg';
import { NodeCreateDrawer } from 'pages/project-visualisation/components/drawers/nodes/create-node';
import styled from 'styled-components';
import { useGetTypes } from 'api/schema/type/use-get-types';
import { useParams } from 'react-router-dom';

type Props = {
  checkedItems: string[];
  filterValue: typeof defaultAllDataFilter;
  setCheckedItems: (checkedItems: string[]) => void;
  setIsAllCheck: Dispatch<SetStateAction<boolean>>;
  setFilterValue: (
    filter: typeof defaultAllDataFilter | ((prevVar: typeof defaultAllDataFilter) => typeof defaultAllDataFilter)
  ) => void;
  onOpenSource: (value: boolean) => void;
};
const AddNodeButton = styled(Button)`
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  border: none;
  justify-content: 'center';
`;

export const AllDataFilterSection = ({
  setFilterValue,
  checkedItems,
  setCheckedItems,
  setIsAllCheck,
  filterValue,
  onOpenSource,
}: Props) => {
  const { state: sortState } = useSort();
  const isPublicPage = useIsPublicPage();
  const { id } = useParams();

  const { nodes } = useGetTypes({ projectId: id ?? '' });

  const setSearchText = useCallback(
    ({ text, type, allowDocumentCount, is_documents }: SearchText) => {
      setFilterValue((prevValue) => ({
        ...prevValue,
        search: text,
        type,
        allowDocumentCount,
        is_documents,
        page: DEFAULT_PAGE_NUMBER,
        ...(isPublicPage && type === 'document' ? { isPublic: true } : {}),
      }));
    },
    [isPublicPage, setFilterValue]
  );
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    const [orderName, order] = sortState?.split(' ') || [];

    if (orderName && order) {
      setFilterValue((prev) => ({
        ...prev,
        allowDocumentCount: false,
        sortField: orderName,
        sortOrder: order,
      }));
    }
  }, [setFilterValue, sortState]);

  return (
    <Row justify="space-between" style={{ padding: '24px 32px 32px 24px' }} gutter={[20, 10]}>
      <Col span={16}>
        <Row gutter={[20, 10]}>
          <Col>
            <Sort prefix="Sort By:" sortItems={ALL_DATA_SORT_BY} fullWidth />
          </Col>
          <Col>
            <ExpandableInput setSearchText={setSearchText} />
          </Col>
        </Row>
      </Col>
      <Row justify="end" gutter={[20, 10]}>
        {filterValue.project_type_list_id?.length ? (
          <Col>
            <DownloadAction nodeTypeIds={filterValue.project_type_list_id} />
          </Col>
        ) : undefined}
        <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
          <DeleteAllDataModal
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            onSubmit={() => {
              setIsAllCheck(false);
            }}
          />
        </Col>
        <AddNodeButton onClick={onOpen} type="primary" disabled={nodes?.length === 0}>
          + Add Node
        </AddNodeButton>
        <Col>
          <SourceSvg style={{ cursor: 'pointer' }} onClick={() => onOpenSource(true)} />
        </Col>
        <NodeCreateDrawer alternativeOpen={open} alternativeClosed={setOpen} />
      </Row>
    </Row>
  );
};
