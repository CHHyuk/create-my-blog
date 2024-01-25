import { Outlet } from "react-router-dom";
import GoogleButton from "./google-btn";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

`
const LayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 15px;
`

const SideBar = styled.nav`
  
`

export default function Layout() {
  return (
    <Wrapper>
      <LayoutWrapper>
        <SideBar>사이드바</SideBar>
        <GoogleButton />
      </LayoutWrapper>
      <Outlet />
    </Wrapper>
  )
}