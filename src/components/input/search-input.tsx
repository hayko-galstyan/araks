import React from 'react';
import { Input } from 'antd';
import { SearchProps } from 'antd/es/input';
import './search-input.css';

const { Search } = Input;

export const SearchInput: React.FC<{ setIsValue: (value: string) => void }> = ({ setIsValue }) => {
  const onSearch: SearchProps['onSearch'] = (value) => setIsValue(value);
  return <Search className="search-input" onSearch={onSearch} placeholder="Search" allowClear />;
};
