/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from '.';
import styled, { css } from 'styled-components';
import './expandable-input.css';
import { COLORS } from 'helpers/constants';
import { changeHeight } from 'helpers/styles';
import { useEffect, useState } from 'react';
import { Select } from 'components/select';

const StyleInput = styled(Input.Search)`
  .ant-input-affix-wrapper {
    padding: 4px 11px;
    background: ${COLORS.PRIMARY.WHITE};
    height: 40px;

    &:hover,
    &:focus,
    &-focused {
      border-right: none;
    }
  }
  ::placeholder {
    color: ${COLORS.PRIMARY.GRAY};
  }

  .ant-input-search-button {
    border: 1px solid;
    border-left: none;
    height: 40px !important;

    ${(props) =>
      !props.size
        ? css`
            ${changeHeight}
          `
        : ''}
  }

  .ant-select-selector {
    height: auto !important;
    padding-top: 0 !important;
  }
`;

export type SearchText = {
  text: string;
  type: string;
  is_documents?: boolean;
  allowDocumentCount?: boolean;
};

type Props = {
  setSearchText: ({ text, type }: SearchText) => void;
};

export const ExpandableInput = ({ setSearchText }: Props) => {
  const [type, setType] = useState('node');
  const [value, setValue] = useState<string>();

  const selectAfter = (
    <Select
      defaultValue="node"
      popupMatchSelectWidth={150}
      dropdownStyle={{}}
      options={[
        { label: 'Node', value: 'node' },
        { label: 'Document', value: 'document' },
      ]}
      onSelect={(value) => {
        setType(value as string);
      }}
    />
  );

  useEffect(() => {
    onDocumentChange();
  }, [setSearchText, type]);

  const onDocumentChange = () => {
    if (!value) {
      setSearchText({
        text: '',
        type: 'node',
        allowDocumentCount: type === 'document',
        is_documents: type === 'document',
      });
    } else {
      setSearchText({ text: value, type, allowDocumentCount: false });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: COLORS.PRIMARY.WHITE }}>
      <StyleInput
        placeholder="search"
        addonBefore={selectAfter}
        onSearch={() => {
          onDocumentChange();
        }}
        onChange={(event) => {
          setValue(event.target?.value ?? '');
        }}
        value={value}
        allowClear
      />
    </div>
  );
};
