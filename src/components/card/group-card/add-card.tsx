import React from 'react';
import { AddCard } from './styled';
import { ReactComponent as PlusIcon } from '../../icons/plus-icon.svg';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';

type TAddGroupCardProps = {
  title: string;
  handleClick: () => void;
  style?: React.CSSProperties;
};

export const AddGroupCard: React.FC<TAddGroupCardProps> = ({ title, handleClick, style }) => {
  return (
    <>
      <AddCard style={style} onClick={handleClick}>
        <PlusIcon />
        <Text color={COLORS.PRIMARY.GRAY} style={{ fontSize: '24px' }}>
          {title}
        </Text>
      </AddCard>
    </>
  );
};
