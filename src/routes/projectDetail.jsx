import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.title`
  
`
const Contents = styled.div`

`
const Comments = styled.div`
  
`

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <Wrapper>
      <Title>
        제목 
      </Title>
      <Contents>
        내용
      </Contents>
      <Comments>
        댓글
      </Comments>
    </Wrapper>
  );
}