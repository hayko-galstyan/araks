import { Button } from 'components/button';
import { MenuText } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';
import { NodeDataResponse } from 'types/node';
import { Tooltip } from 'antd';

type Props = {
  text: string;
  rowData?: NodeDataResponse;
};

const CedllName = styled(MenuText)`
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1.4px !important;
  text-decoration-line: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 0.1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12rem;
`;

export const NodeViewButton = ({ text, rowData }: Props) => {
  const { dispatch } = useViewDatasheet();

  return (
    <>
      <Button type="link" className="table-row-height" onClick={() => dispatch(rowData?.id || '')}>
        <Tooltip title={text} placement="bottom">
          <CedllName underline color={COLORS.PRIMARY.BLUE}>
            {text}
          </CedllName>
        </Tooltip>
      </Button>
    </>
  );
};
