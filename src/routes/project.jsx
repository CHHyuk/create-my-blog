import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TagList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  padding: 0 0 3rem 0;

`
const Tag = styled.div`
  border: 1px solid white;  
  border-radius: 1rem;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
    transition: all 0.3s ease-in-out; 
  }
`
const Container = styled.div`
  display: flex;
  border: 1px solid white;
  padding: 2rem;
  border-radius: 1rem;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`

const Items = styled.div`
  border: 1px solid red;
  display: flex;
`

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'project'), orderBy('createdAt', 'desc')));
      const projectsArray = [];
      const tagsSet = new Set();
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        projectsArray.push({ id: doc.id, ...data });
        if (data.tags) {
          tagsSet.add(data.tags);
        }
      });
  
      setProjects(projectsArray);
      setTags([...tagsSet]);
    };
  
    fetchProjects();
  }, []);

  return (
    <Wrapper>
      <TagList>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagList>
      <Container>
        {projects.map((project) => (
          <Items key={project.id}>
            <Link to={`/project/${project.id}`}>{project.title}</Link>
          </Items>
        ))}
      </Container>
    </Wrapper>
  )
}