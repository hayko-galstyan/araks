import styled from 'styled-components';
import { AutoComplete as AntAutoComplete, Avatar, Form } from 'antd';
import React, { useMemo } from 'react';
import { getHighlightedText } from 'pages/project-visualisation/components/search/canvas/options/utils';
import { FilterFunc } from 'rc-select/lib/Select';
import { IJiraUser, IJiraUsers } from '../../types/jira-integration';

type FilterOption = boolean | FilterFunc<{ key: string; value: string; label: JSX.Element }> | undefined;

type Props = React.FC<{
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  children: React.ReactNode;
  data: IJiraUsers;
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

const renderUsers = (user: IJiraUser, search: string) => ({
  id: user.accountId,
  value: user.accountId,
  name: user.displayName,
  email: user.emailAddress,
  mode: 'user',
  label: (
    <UserItem>
      <div className="user-name">
        <Avatar src={user.avatarUrls['32x32']} />
        {getHighlightedText(user.displayName, search)}
      </div>
    </UserItem>
  ),
});

export const JiraUserAutocomplete: Props = ({ data: jiraUsers, search, setSearch, children }) => {
  const form = Form.useFormInstance();

  const options = useMemo(
    () =>
      jiraUsers?.users?.map((user) => ({
        key: user.accountId,
        ...renderUsers(user, search ?? ''),
      })),
    [jiraUsers?.users, search]
  );

  const onSelect = (value: string, { id, name, email }: SelectProp) => {
    setSearch(name);
    form.setFieldsValue({ ...form.getFieldsValue(), assignee_id: id });
  };

  const filterOption: FilterOption = (inputValue, option) => {
    return option!.key?.toUpperCase().indexOf(option?.key.toUpperCase() ?? '') !== -1;
  };

  return (
    <AntAutoComplete
      popupClassName="search-perspective-users"
      dropdownStyle={{
        fontSize: '12px',
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
