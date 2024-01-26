import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Text = styled.div`
  display: inline-block; // 인라인 블록으로 설정
  position: relative;

  .cursor {
    display: inline-block; // 인라인 블록으로 설정
    width: 2px; // 커서 너비
    height: 0.6em; // 커서 높이
    background: white; // 커서 색상
    animation: blink 0.5s step-start infinite;
  }

  @keyframes blink {
    50% {
      background: transparent;
    }
  }
`;


export default function TypingTitle({ string, delay }) {
  const [text, setText] = useState('');
  const [typingFinished, setTypingFinished] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);

  useEffect(() => {
    let typingInterval;

    const startTyping = () => {
      setTypingStarted(true);
      let count = 0;

      typingInterval = setInterval(() => {
        if (count < string.length-1) {
          setText((prevText) => prevText + string[count]);
          count++;
        } else {
          setTypingFinished(true);
          clearInterval(typingInterval);
        }
      }, 100);
    };

    const delayTimer = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(typingInterval);
    };
  }, [string, delay]);

  return (
    <Text>
      {text}
      {typingStarted && !typingFinished && <span className="cursor"></span>}
    </Text>
  );
}

