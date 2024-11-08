import { Button, Space } from "antd"

import { ReactComponent as Blocks } from '../icons/blocks.svg';
import { ReactComponent as BlocksSelected } from '../icons/blocks-selected.svg';
import { ReactComponent as Grid } from '../icons/grid.svg';
import { ReactComponent as GridSelected } from '../icons/grid-selected.svg';
import { useView, ViewTypes } from "../../context/view-context";
import styled from "styled-components";

const ViewButton = styled(Button)`
    background-color: transparent;
    border: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const View = () => {
    const {state, dispatch} = useView();

    return <Space align="center">
        {
            state === ViewTypes.Block ? <>
                <ViewButton icon={<BlocksSelected />}/>
                <ViewButton onClick={() => dispatch(ViewTypes.Grid)} icon={<Grid  />}/>
            </> : <>
                <ViewButton onClick={() => dispatch(ViewTypes.Block)} icon={<Blocks  />}/>
                <ViewButton icon={<GridSelected />}/>
            </>
        }
    </Space>
}
