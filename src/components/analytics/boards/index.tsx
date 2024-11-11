import React, { useCallback, useState } from 'react';
import { BoardItem, BoardsContainer } from './styles';
import { Text } from 'components/typography';
import { Input } from 'components/input';
import { COLORS } from 'helpers/constants';
import { Flex, Tooltip, Typography } from 'antd';
import { SyncOutlined, UploadOutlined } from '@ant-design/icons';
import { useAnalytics } from 'context/analytics';
import { ACTIONS } from 'context/analytics/reducer';
import { useCreateNewBoard } from 'api/analytics/use-create-new-board';
import { useGetAllBoards } from 'api/analytics/use-get-all-boards';
import { useChangeBoard } from 'api/analytics/use-change-board';
import { useDeleteBoard } from 'api/analytics/use-delete-board';
import { ReactComponent as RemoveIcon } from 'components/icons/remove.svg';
import { ReactComponent as AddBoardIcon } from 'components/icons/plus-icon.svg';
import { TBoardParam } from '../types';

const { Paragraph } = Typography;

export const Boards: React.FC<TBoardParam> = ({ onHandleScreenShot, onUpdateBoard, isUpdateBoard }) => {
  const { boards, activeBoard, handleAction } = useAnalytics();

  const [editingBoardIndex, setEditingBoardIndex] = useState<string | null>(null);
  const [newBoardName, setNewBoardName] = useState('');

  /* get boards  */
  useGetAllBoards({
    onSuccess: (data) => {
      handleAction({
        type: ACTIONS.SET_BOARDS,
        payload: data,
      });
    },
  });

  const { mutate: createNewBoardFn } = useCreateNewBoard();
  const { mutate: renameBoardFn } = useChangeBoard();
  const { mutate: deleteBoardFn } = useDeleteBoard();

  const handleClickSetActiveBoard = useCallback(
    (id: string) => {
      handleAction({
        type: ACTIONS.CHANGE_BOARD,
        payload: id,
      });
    },
    [handleAction]
  );

  const handleDoubleClickBoard = useCallback((id: string, name: string) => {
    setEditingBoardIndex(id);
    setNewBoardName(name);
  }, []);

  const handleBoardNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setNewBoardName(value);
  }, []);

  const handleRenameBoard = (id: string) => {
    const name =
      newBoardName && newBoardName.length > 3
        ? newBoardName
        : boards.find((item) => item.id === editingBoardIndex)?.name || '';

    renameBoardFn(
      { id: id, name: name },
      {
        onSuccess: () => {
          handleAction({
            type: ACTIONS.RENAME_BOARD_NAME,
            payload: { id, name: name },
          });
          setEditingBoardIndex(null);
        },
      }
    );
  };

  const handleDeleteBoard = useCallback(
    (e: React.MouseEvent<SVGSVGElement>, id: string) => {
      e.stopPropagation();
      deleteBoardFn(id, {
        onSuccess: () => {
          handleAction({
            type: ACTIONS.REMOVE_BOARD,
            payload: id,
          });
        },
      });
      setEditingBoardIndex(null);
    },
    [deleteBoardFn, handleAction]
  );

  const handleClickAddBoard = () => {
    const name = `Page ${boards.length + 1}`;
    createNewBoardFn(name, {
      onSuccess: (data) => {
        handleAction({
          type: ACTIONS.ADD_BOARD,
          payload: [...boards, data.data],
        });
      },
    });
  };

  const isActiveBoard = useCallback(
    (id: string) => {
      return activeBoard === id;
    },
    [activeBoard]
  );

  return (
    <>
      <BoardsContainer>
        <Flex style={{ width: '90%' }}>
          {boards.map((board, index) => (
            <BoardItem
              key={index}
              gap={20}
              justify="space-between"
              onClick={() => handleClickSetActiveBoard(board.id)}
              style={{ borderBottom: isActiveBoard(board.id) ? `2px solid ${COLORS.BLUE_10}` : 'none' }}
            >
              {isActiveBoard(board.id) && <SyncOutlined spin={isUpdateBoard} onClick={() => onUpdateBoard(true)} />}
              <Text onDoubleClick={() => handleDoubleClickBoard(board.id, board.name)} className="board_name">
                {editingBoardIndex === board.id ? (
                  <Input
                    value={newBoardName}
                    onChange={handleBoardNameChange}
                    onPressEnter={() => handleRenameBoard(board.id)}
                    onBlur={() => handleRenameBoard(board.id)}
                    style={{ background: 'transparent', height: 30 }}
                  />
                ) : (
                  <Paragraph
                    ellipsis={{ rows: 1, tooltip: board.name }}
                    style={{ maxWidth: 150, marginBottom: 0, fontSize: isActiveBoard(board.id) ? 18 : 14 }}
                  >
                    {board.name}
                  </Paragraph>
                )}
              </Text>
              <RemoveIcon onClick={(e) => handleDeleteBoard(e, board.id)} />
            </BoardItem>
          ))}
          {boards.length < 5 && (
            <BoardItem
              style={{
                cursor: 'pointer',
                width: 'max-content',
              }}
              justify="center"
              onClick={handleClickAddBoard}
            >
              <AddBoardIcon />
            </BoardItem>
          )}
        </Flex>
        <BoardItem
          style={{
            cursor: 'pointer',
            width: 'max-content',
          }}
          onClick={onHandleScreenShot}
        >
          <Tooltip title="Export">
            <UploadOutlined />
          </Tooltip>
        </BoardItem>
      </BoardsContainer>
    </>
  );
};
