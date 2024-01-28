import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  font-size: 2.5rem;
  padding: 1rem;
`
const Tag = styled.div`
  display: flex;
  max-width: 52.25rem;
  width: 80%;
  justify-content: right;
  align-items: center;
  padding: 1rem;
  font-size: 1.5rem;
`

const Contents = styled.div`
  max-width: 52.25rem;
  width: 100%;
`

export default function AlgorithmDetail() {
  const { id } = useParams();
  const [algorithm, setAlgorithm] = useState(null);

  useEffect(() => {
    const fetchAlgorithm = async () => {
      const docRef = doc(db, 'algorithm', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setAlgorithm({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log('No such document!');
      }
    };

    fetchAlgorithm();
  }, [id]);

  if (!algorithm) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <Title>{algorithm.title}</Title>
      <Tag>{algorithm.tag}</Tag>
      <Contents>
        <Viewer initialValue={algorithm.content} />
      </Contents>
    </Wrapper>
  );
}