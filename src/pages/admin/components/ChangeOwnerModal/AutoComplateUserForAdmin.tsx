import styled from 'styled-components';
import { AutoComplete as AntAutoComplete, Avatar } from 'antd';
import React, { useMemo } from 'react';
import { getHighlightedText } from 'pages/project-visualisation/components/search/canvas/options/utils';
import { UserData } from 'api/types';
import { FilterFunc } from 'rc-select/lib/Select';
import { getAvatarPath } from 'helpers/utils';
import { useGetUserSearchAutocomplete } from 'api/user/use-get-user-search';

type FilterOption = boolean | FilterFunc<{ key: string; value: string; label: JSX.Element }> | undefined;

type Props = React.FC<{
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSelectedUser: (selectedUser: { name: string; id: string; avatar?: string }) => void;
  currentUserID: string;
  children: React.ReactNode;
}>;

type SelectProp = { id: string; avatar?: string; name: string };

export const UserItem = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 3rem;

  .user-name {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const renderUsers = (user: UserData, search: string) => ({
  id: user.id,
  value: user.id,
  name: `${user.first_name} ${user.last_name}`,
  email: user.email,
  mode: 'user',
  label: (
    <UserItem>
      <div className="user-name">
        <Avatar src={getAvatarPath(user.avatar)} />
        {getHighlightedText(`${user.first_name} ${user.last_name}`, search)}
      </div>
    </UserItem>
  ),
});

export const AutoCompleteUserForAdmin: Props = ({ search, setSearch, setSelectedUser, currentUserID, children }) => {
  const { data } = useGetUserSearchAutocomplete(search?.trim() ?? '', {
    enabled: search ? search.trim()?.length > 2 : false,
  });

  const options = useMemo(
    () =>
      data?.rows
        .filter((user) => user.id !== currentUserID)
        .map((user) => ({
          key: user.id,
          avatar: user.avatar,
          ...renderUsers(user, search ?? ''),
        })),
    [data?.rows, search, currentUserID]
  );

  const onSelect = (value: string, { id, name, avatar }: SelectProp) => {
    setSearch(name);
    setSelectedUser({ name: name, id: id, avatar: avatar });
  };

  const filterOption: FilterOption = (inputValue, option) => {
    return option!.key?.toUpperCase().indexOf(option?.key.toUpperCase() ?? '') !== -1;
  };

  return (
    <AntAutoComplete
      popupClassName="search-perspective-users"
      dropdownStyle={{
        backdropFilter: 'blur(7px)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
      }}
      onSelect={onSelect}
      filterOption={filterOption}
      options={options}
      value={search}
    >
      {children}
    </AntAutoComplete>
  );
};
