import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'components/input';
import { FormItem } from '../form-item';
import { SelectItem } from './select-item';
import { CaretDownFilled } from '@ant-design/icons';
import { AutoCompleteUser } from './auto-complete-user';
import { ROLE_OPTIONS } from 'helpers/constants';

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

export const ShareInputItemAddon = ({ isCleared }: { isCleared?: boolean }) => {
  const [search, setSearch] = useState<string>();

  const handleChange: HandleChange = async ({ target: { value } }) => {
    setSearch(value);
  };

  useEffect(() => setSearch(''), [isCleared]);

  return (
    <ShareFormItemWrapper>
      <FormItem noStyle name="email" rules={[{ required: true }]}>
        <AutoCompleteUser search={search} setSearch={setSearch}>
          <ShareInput placeholder="Member Name" onChange={handleChange} value={search} />
        </AutoCompleteUser>
      </FormItem>
      <FormItem name="userId">
        <Input style={{ display: 'none' }} />
      </FormItem>
      <SelectItem
        name="role"
        popupClassName="role-dropdown"
        suffixIcon={<CaretDownFilled />}
        style={{ width: 150, formStyle: { position: 'absolute', top: 0, right: 0 } }}
        options={ROLE_OPTIONS}
        defaultValue={ROLE_OPTIONS[0].value}
      />
    </ShareFormItemWrapper>
  );
};
