import { Col, Row } from 'antd';
import styled from 'styled-components';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { useGetQueryByProjectId } from 'api/query-history/use-get-histories';
import { ReactComponent as DelateSvg } from 'components/icons/delete_outline-simple.svg';
import { DeleteQueryeModal } from './DelateQueryModal';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
type Props = {
  activeQuerisID: { name: string; id: string } | null;
  setActiveQuerisID: (activeQuerisID: { name: string; id: string } | null) => void;
};
type itemProps = {
  id: string;
  name: string;
};

const Header = styled(Row)`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Titel = styled(Row)<{ backgroundColor?: string }>`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  padding: 4px;
`;
const ItemBox = styled(Row)<{ backgroundColor?: string }>`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  &:hover {
    background-color: ${(props) => (props.backgroundColor !== 'transparent' ? props.backgroundColor : `#c5c2c2`)};
  }
`;

export const QuerySection = ({ activeQuerisID, setActiveQuerisID }: Props) => {
  const params = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<string | null>(null);

  const data = useGetQueryByProjectId(params.id ?? '', {
    enabled: !!params.id,
  });

  return (
    <Row style={{ width: '100%', overflow: 'hidden', minWidth: 200 }}>
      <Header>
        <Text>Saved Queries({data !== undefined && data.length})</Text>
      </Header>
      <Titel
        onClick={() => setActiveQuerisID(null)}
        backgroundColor={activeQuerisID === null ? COLORS.PRIMARY.GRAY_DARK : 'transparent'}
      >
        <Text
          color={activeQuerisID === null ? COLORS.PRIMARY.WHITE : COLORS.PRIMARY.GRAY_DARK}
          style={{ fontSize: 20, fontWeight: 600 }}
        >
          New Query
        </Text>
      </Titel>
      {data !== undefined &&
        data.map((e: itemProps) => (
          <ItemBox
            backgroundColor={
              activeQuerisID !== null && activeQuerisID.id === e.id ? COLORS.PRIMARY.GRAY_DARK : 'transparent'
            }
            key={e.id}
            onClick={() => setActiveQuerisID({ name: e.name, id: e.id })}
          >
            <Text
              color={
                activeQuerisID !== null && activeQuerisID.id === e.id ? COLORS.PRIMARY.WHITE : COLORS.PRIMARY.GRAY_DARK
              }
            >
              {e.name}
            </Text>
            <Col onClick={() => setIsDeleteModalOpen(e.id)}>
              <DelateSvg />
            </Col>
          </ItemBox>
        ))}
      {isDeleteModalOpen !== null && (
        <DeleteQueryeModal
          isModalOpen={isDeleteModalOpen !== null ? true : false}
          setIsModalOpen={setIsDeleteModalOpen}
          projectId={params.id ?? ''}
          queryId={isDeleteModalOpen}
        />
      )}
    </Row>
  );
};
