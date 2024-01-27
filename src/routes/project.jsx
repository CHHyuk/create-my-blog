import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

const projects = [
  { id: `1`, title: 'project 1' },
  { id: `2`, title: 'project 2' },
  { id: `3`, title: 'project 3' },
  { id: `4`, title: 'project 4' },
]


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TagList = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  font-size: 1.3rem;
  padding: 0 0 3rem 0;
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
  return (
    <Wrapper>
      <TagList>
        <tag>태그1</tag>
        <tag>태그2</tag>
        <tag>태그3</tag>
      </TagList>
      <Container>
        {projects.map((project) => (
          <Items key={project.id}>
            <Link to={`/project/${project.id}`}>{project.title}</Link>
          </Items>
        ))}
      </Container>
      <Outlet />
    </Wrapper>
  )
}