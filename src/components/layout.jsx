import { Outlet } from "react-router-dom";
import GoogleButton from "./google-btn";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Title = styled.button`
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

const ContentWrapper = styled.div`
  margin: 0 auto;
  padding: 100px 15px 50px 15px;
  max-width: 52.25rem;
  width: 100%;
`

export default function Layout() {
  const navigate = useNavigate();
  const handleTitle = () => {
    navigate("/");
  }

  return (
    <Wrapper>
      <LayoutWrapper>
        <Title onClick={handleTitle}>웹개발 수난시대</Title>
        <GoogleButton />
      </LayoutWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </Wrapper>
  )
}