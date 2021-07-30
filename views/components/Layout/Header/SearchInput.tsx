import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

export interface ISearchInputProps extends InputProps {}

export const SearchInput: React.FC<ISearchInputProps> = (props) => {
  return <Input {...props} />;
};
