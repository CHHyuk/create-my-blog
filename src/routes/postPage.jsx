import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
`;


const PostPage = () => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [content, setContent] = useState('');
  const [collectionName, setCollectionName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!collectionName) {
      alert('컬렉션을 선택해주세요.');
      return;
    }

    try {
      await addDoc(collection(db, collectionName), {
        title,
        tag,
        content,
        createdAt: serverTimestamp(),
      });
      setTitle('');
      setTag('');
      setContent('');
      setCollectionName('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
        required
      >
        <option value="">컬렉션 선택...</option>
        <option value="project">프로젝트</option>
        <option value="programming">프로그래밍</option>
        <option value="algorithm">알고리즘</option>
        <option value="techstack">CS지식</option>
        <option value="techtrend">기술 동향</option>
      </Select>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        required
      />
      <Input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="태그"
        required
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        required
      />
      <Button type="submit">작성</Button>
    </Form>
  );
};

export default PostPage;
