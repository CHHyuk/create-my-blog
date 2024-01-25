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
  border: none; 
  outline: none;
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
      <Outlet />
    </Wrapper>
  )
}