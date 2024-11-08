import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'components/input';
import { AutoCompleteUserForAdmin } from './AutoComplateUserForAdmin';

type HandleChange = (event: { target: { value: string } }) => void;

const ShareFormItemWrapper = styled.div`
  .ant-select {
    width: 100%;
  }

  .ant-form-item-control-input {
    min-height: auto;
  }

  .ant-select-selector {
    background: linear-gradient(91.54deg, rgba(232, 235, 248, 0.7) 5.25%, rgba(232, 235, 248, 0.2) 97.48%);
    border-color: #c3c3c3;
  }
`;

const ShareInput = styled(Input)`
  height: 40px;
  font-weight: 600;
  letter-spacing: 0.07em;
  color: #414141;
`;
interface Props {
  setSelectedUser: (selectedUser: { name: string; id: string; avatar?: string } | null) => void;
  isCleared?: boolean;
  currentUserID: string;
}

export const SelectUserWithSearch = ({ isCleared, setSelectedUser, currentUserID }: Props) => {
  const [search, setSearch] = useState<string>();

  const handleChange: HandleChange = async ({ target: { value } }) => {
    setSearch(value);
  };

  useEffect(() => setSearch(''), [isCleared]);

  return (
    <ShareFormItemWrapper>
      <AutoCompleteUserForAdmin
        search={search}
        setSearch={setSearch}
        setSelectedUser={setSelectedUser}
        currentUserID={currentUserID}
      >
        <ShareInput placeholder="Member Name" onChange={handleChange} value={search} />
      </AutoCompleteUserForAdmin>
      <Input style={{ display: 'none' }} />
    </ShareFormItemWrapper>
  );
};
