import styled from 'styled-components';
import { Input } from 'components/input';
import { ReactComponent as SearchSVG } from 'components/icons/search.svg';
import { COLORS } from 'helpers/constants';
import { useDocument } from 'components/layouts/components/document/wrapper';

const ToolStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 400px;
  margin-bottom: 4px;
  background-color: transparent;
  border-bottom: 1px solid ${COLORS.PRIMARY.GRAY};

  input {
    background: transparent !important;
  }
`;

export const SearchDocument = () => {
  const { setSearchDocument } = useDocument();

  return (
    <ToolStyle>
      <SearchSVG style={{ width: '20px' }} />
      <Input
        onPressEnter={({ target }) => {
          const value = (target as HTMLInputElement).value;

          if (value.length > 2) {
            setSearchDocument((target as HTMLInputElement).value);
          } else setSearchDocument(undefined);
        }}
        placeholder="Search Document"
        style={{ border: 'none', boxShadow: 'none', width: '96%', fontSize: 18 }}
      />
    </ToolStyle>
  );
};
