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
  flex-wrap: wrap;
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
  flex-direction: column;
  padding: 2rem;
  border-radius: 1rem;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  max-width: 45rem;
  width: 100%;
`

const Items = styled(Link)` 
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 1rem;
  font-size: 1.5rem;
  display: flex;
  background-color: #363636;
  padding: 1rem;
  text-decoration: none; 
  color: inherit; 

  &:hover {
    cursor: pointer;
    opacity: 0.8;
    scale: 1.05;
    transition: all 0.3s ease-in-out;
  }
`

const TagTitle = styled.div`
  padding: 1rem;
  font-size: 2rem;
`

const ContainerTitle = styled.div`
  padding: 1rem;
  font-size: 2rem;
`

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'project'), orderBy('createdAt', 'desc')));
      const projectsArray = [];
      const tagsSet = new Set();

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        projectsArray.push({ id: doc.id, ...data });
        tagsSet.add(data.tag);
      });

      setProjects(projectsArray);
      setTags([...tagsSet]);
    };

    fetchProjects();
  }, []);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const filteredProjects = selectedTag
    ? projects.filter((project) => project.tag === selectedTag)
    : projects;


  return (
    <Wrapper>
      <TagTitle>프로젝트</TagTitle>
      <TagList>
        {tags.map((tag, index) => (
          <Tag key={index} onClick={() => handleTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </TagList>
      <ContainerTitle>목록</ContainerTitle>
      <Container>
        {filteredProjects.map((project) => (
          <Items to={`/project/${project.id}`} key={project.id}>
            {project.title}
          </Items>
        ))}
      </Container>
    </Wrapper>
  );
}