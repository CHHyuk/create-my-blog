import React, { useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const Form = styled.form`
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  max-width: 100px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  max-width: 500px;
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
  const editorRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!collectionName) {
      alert('컬렉션을 선택해주세요.');
      return;
    }

    const editorInstance = editorRef.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();

    try {
      await addDoc(collection(db, collectionName), {
        title,
        tag,
        content: markdownContent, 
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
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
      <Button type="submit">작성</Button>
    </Form>
  );
};

export default PostPage;
