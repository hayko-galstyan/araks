import { COLORS } from 'helpers/constants';
import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchSVG } from 'components/icons/search.svg';

const Container = styled.div`
  max-width: 422px;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: nowrap;
  align-items: flex-end;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: ${COLORS.PRIMARY.WHITE};
`;

const Box = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding-left: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
  align-items: center;
  justify-content: end;
  background-color: ${COLORS.PRIMARY.WHITE};
  &:focus {
    border-color: ${COLORS.SECONDARY.STEEL_BLUE};
    box-shadow: 0 0 5px ${COLORS.SECONDARY.STEEL_BLUE};
  }
`;

const StyledInput = styled.input`
  height: 40px;
  width: 350px;
  padding: 12px 15px;
  font-size: 16px;
  border: none;
  outline: none;
`;

const StyledButton = styled.button`
  height: 40px;
  width: 112px;
  padding: 12px 20px;
  background-color: ${COLORS.SECONDARY.STEEL_BLUE};
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  search: string;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
}

export const SearchWithButton = ({ search, setSearch, setPage }: Props) => {
  const [currentSearch, setCurrentSearch] = useState<string>('');
  const handleSearch = useCallback(() => {
    setSearch(currentSearch);
    setPage(1);
  }, [currentSearch, setSearch, setPage]);

  const handleOnChange = (e: string) => {
    setCurrentSearch(e);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (currentSearch.length <= 2 && search.length >= 3) {
      handleSearch();
    }
  }, [currentSearch, handleSearch, search.length]);

  return (
    <Container>
      <Box>
        <SearchSVG />
        <StyledInput
          defaultValue={search}
          value={currentSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <StyledButton onClick={handleSearch}>
          Search
        </StyledButton>
      </Box>
    </Container>
  );
};
