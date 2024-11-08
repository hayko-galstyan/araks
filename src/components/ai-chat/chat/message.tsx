import React from 'react';
import { MessageContent, Msg } from './styled';
import { ReactComponent as AiAvatar } from '../../icons/chat-icon.svg';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import { useAuth } from 'context/auth-context';
import { getAvatarPath } from 'helpers/utils';
import { Avatar, Skeleton } from 'antd';

type IMessageProps = {
  type: string;
  text: string;
  isLoading: boolean;
};

export const Message: React.FC<IMessageProps> = ({ type, text, isLoading }) => {
  const { user } = useAuth();
  return (
    <Msg type={type}>
      {type === 'receiver' ? <AiAvatar /> : <Avatar src={getAvatarPath(user?.avatar)} />}
      {isLoading && type === 'receiver' ? (
        <Skeleton active={true} loading={isLoading} />
      ) : (
        text?.length && (
          <MessageContent className={`message ${type}`}>
            <Text color={COLORS.PRIMARY.WHITE} style={{ fontWeight: 400 }}>
              {text}
            </Text>
          </MessageContent>
        )
      )}
    </Msg>
  );
};
