import React, { useState } from 'react';
import { ReactComponent as ChatIcon } from '../icons/ai-chat.svg';
import { IconWrapper } from './styled';
import { Chat } from './chat';

export const AiChat: React.FC = () => {
  const [startChat, setIsStartChat] = useState<boolean>(false);

  return (
    <>
      <IconWrapper onClick={() => setIsStartChat(!startChat)}>
        <ChatIcon />
      </IconWrapper>
      <Chat title="Araks AI Chat" start={startChat} onStart={setIsStartChat} />
    </>
  );
};
