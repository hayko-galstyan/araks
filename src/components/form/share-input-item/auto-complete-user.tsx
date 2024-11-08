import styled from 'styled-components';
import { useGetUserSearchAutocomplete } from '../../../api/user/use-get-user-search';
import { AutoComplete as AntAutoComplete, Avatar, Form } from 'antd';
import React, { useMemo } from 'react';
import { getHighlightedText } from 'pages/project-visualisation/components/search/canvas/options/utils';
import { UserData } from 'api/types';
import { getAvatarPath } from '../../../helpers/utils';
import { FilterFunc } from 'rc-select/lib/Select';

type FilterOption = boolean | FilterFunc<{ key: string; value: string; label: JSX.Element }> | undefined;

type Props = React.FC<{
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  children: React.ReactNode;
}>;

type SelectProp = { id: string; email: string; name: string };

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

export const AutoCompleteUser: Props = ({ search, setSearch, children }) => {
  const form = Form.useFormInstance();

  const { data } = useGetUserSearchAutocomplete(search?.trim() ?? '', {
    enabled: search ? search.trim()?.length > 2 : false,
  });

  const options = useMemo(
    () =>
      data?.rows.map((user) => ({
        key: user.id,
        ...renderUsers(user, search ?? ''),
      })),
    [data?.rows, search]
  );

  const onSelect = (value: string, { id, name, email }: SelectProp) => {
    setSearch(name);
    form.setFieldsValue({ email: name, userId: id, userEmail: email });
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
