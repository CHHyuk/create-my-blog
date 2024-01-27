import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDatabase, ref, onValue, push, query, limitToLast } from 'firebase/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 26rem;
  gap: 1rem;
`

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  height: 40rem;
  width: 100%;
  overflow-y: scroll;
  border-radius: 10px;
  scrollbar-width: none;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;

const ChatButton = styled.button`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
  }
`;
const Message = styled.div`
  background: #363636;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
`;
export default function LiveChat() {
  const [user, loading, error] = useAuthState(auth);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // 데이터베이스에서 채팅 메시지 가져오기
  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, 'messages');

    const lastHundredMessagesRef = query(messagesRef, limitToLast(30));

    onValue(lastHundredMessagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];
      for (const key in data) {
        loadedMessages.push({
          ...data[key],
          key: key
        });
      }
      // 메시지 목록을 시간순으로 정렬
      loadedMessages.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(loadedMessages);
    });
  }, []);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const db = getDatabase();
    const messagesRef = ref(db, 'messages');

    push(messagesRef, {
      text: newMessage,
      timestamp: Date.now(),
      uid: user.uid,
      displayName: user.displayName
    });

    setNewMessage('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Chat>
      <ChatContainer>
        {messages.sort((a, b) => b.timestamp - a.timestamp).map((message) => (
          <Message key={message.key}>
            <strong>{message.displayName}</strong>: {message.text}
          </Message>
        ))}
      </ChatContainer>
      <ChatInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder={user ? "메시지를 남겨주세요" : "구글 로그인 후 채팅이 가능합니다."}
        onKeyPress={handleKeyPress}
        disabled={!user}
      />
      <ChatButton onClick={sendMessage} disabled={!user}>
        전송
      </ChatButton>
    </Chat>
  );
}
