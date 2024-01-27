import { Outlet } from "react-router-dom";
import GoogleButton from "./google-btn";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`
const LayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 15px 15px;
  max-width: 52.25rem;
  width: 100%;
`

const Title = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  background-color: black;
  color: white;
  cursor: pointer;
  border: 1px solid black;
  outline: none;
  padding: 20px;
  border-radius: 10px;
  &:hover {
    border: 1px solid white;
    transition: all 0.3s ease-in-out;
  }
`




// 네비게이션 wrapper
const NavigationWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  gap: 0.3rem;
  padding: 15px 15px;
  max-width: 52.25rem;
  width: 100%;
`


const Text = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  background-color: black;
  color: white;
  cursor: pointer;
  border: 1px solid black;
  outline: none;
  padding: 10px;
  border-radius: 10px;
  &:hover {
    background-color: white;
    color: black;
    transition: all 0.3s ease-in-out;
  }
`

const ContentWrapper = styled.div`
  margin: 0 auto;
  padding: 100px 15px 50px 15px;
  max-width: 52.25rem;
  width: 100%;
`

export default function Layout() {

  return (
    <Wrapper>
      <LayoutWrapper>
        <Title to='/'>웹개발 수난시대</Title>
        <GoogleButton />
      </LayoutWrapper>
      <NavigationWrapper>
        <Text to='/algorithm'>알고리즘</Text>
        <Text to='/techstack'>프로그래밍</Text>
        <Text to='/project'>프로젝트</Text>
        <Text to='/techinsight'>CS 지식</Text>
        <Text to='/techtrend'>기술 동향</Text>
      </NavigationWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Wrapper>
  )
}