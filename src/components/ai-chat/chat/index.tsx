import React, { useEffect, useRef, useState } from 'react';
import { ChatBody, ChatContainer, ChatFooter, ChatHeader } from './styled';
import { Text } from 'components/typography';
import { CloseCircleOutlined, SendOutlined } from '@ant-design/icons';
import { TextArea } from 'components/input';
import { Message } from './message';
import { COLORS } from 'helpers/constants';
import { useGetMessageAi } from 'api/ai-chat';

type IChatProps = {
  start: boolean;
  onStart: (value: boolean) => void;
  title: string;
};

type TData = Array<{ text: string }>;

export const Chat: React.FC<IChatProps> = ({ start, onStart, title }) => {
  const [value, setIsValue] = useState<string>('');
  const [message, setIsMessage] = useState<string | undefined>(undefined);
  const [data, setIsData] = useState<TData>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: answer } = useGetMessageAi(message ?? '', {
    enabled: !!message,
  });

  const sendMessage = () => {
    if (value.trim()) {
      setIsData((prev) => [...prev, { text: value }, { text: '' }]);
      setIsLoading(true);
      setIsMessage(value);
      setIsValue('');
    }
  };

  useEffect(() => {
    if (answer && answer.response) {
      setIsData((prev) => {
        const updatedData = [...prev];
        updatedData[prev.length - 1] = { text: answer.response };
        return updatedData;
      });
      setIsLoading(false);
    }
  }, [answer]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight + 100;
    }
    if (!data?.length && start) {
      setIsData((prev) => [...prev, { text: 'Hello, how can I help you with your graph?' }]);
    }
  }, [start, data]);

  return (
    <ChatContainer open={start}>
      <ChatHeader>
        <Text style={{ color: COLORS.PRIMARY.WHITE, fontSize: '22px' }}>{title}</Text>
        <CloseCircleOutlined onClick={() => onStart(!start)} />
      </ChatHeader>
      <ChatBody ref={chatRef}>
        {data.map((item, index) => (
          <Message
            key={index}
            type={(index + 1) % 2 === 1 ? 'receiver' : 'sender'}
            text={item.text}
            isLoading={isLoading && index === data?.length - 1}
          />
        ))}
      </ChatBody>
      <ChatFooter disabled={isLoading}>
        <TextArea
          placeholder="Please type your response here"
          value={value}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
          onChange={(e) => setIsValue(e.target.value)}
        />
        <SendOutlined disabled={isLoading || !value.trim()} onClick={sendMessage} />
      </ChatFooter>
    </ChatContainer>
  );
};
