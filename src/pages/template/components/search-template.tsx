import { FC, useState } from 'react';
import styled from 'styled-components';
import { Input } from 'components/input';
import { ReactComponent as SearchSVG } from 'components/icons/search.svg';
import { COLORS } from 'helpers/constants';

type Props = FC<{ search: string | undefined; setSearch: (value: string) => void }>;

const ToolStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 500px;
  top: 176px;
  margin-bottom: 30px;
  background-color: ${COLORS.PRIMARY.WHITE};
  box-shadow: 0px 10px 10px rgba(141, 143, 166, 0.2);
  border-radius: 4px;
  padding-left: 4px;

  > * {
    width: auto;
    height: 40px;
  }

  .add-type,
  .add-link {
    cursor: pointer;

    &:hover {
      rect:first-child {
        fill: rgba(35, 47, 106, 0.8);
      }
    }
  }
`;

export const SearcTemplete: Props = ({ search, setSearch }) => {
  const [curentSerch, setCurentSeracrh] = useState<string>('');

  return (
    <>
      <ToolStyle >
        <SearchSVG style={{ width: '4%'}} />
        <Input
          onPressEnter={({ target }) => {
            const value = (target as HTMLInputElement).value;

            if (value.length > 2) {
              setSearch((target as HTMLInputElement).value);
            } else setSearch('');
          }}
          value={curentSerch}
          onChange={(e) => setCurentSeracrh(e.target.value)}
          placeholder="search"
          style={{border:'none', boxShadow: 'none', width: '96%'}}
        />
      </ToolStyle>
    </>
  );
};
