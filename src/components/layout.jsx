import { Outlet } from "react-router-dom";
import GoogleButton from "./google-btn";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const allowedUID = 

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

`
const LayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 15px 15px;
  max-width: 52.25rem;
  width: 100%;
  border-bottom: 1px solid white;
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
  padding: 10px 10px;
  max-width: 52.25rem;
  width: 100%;
  flex-wrap: wrap;
`


const Text = styled(Link)`
  text-decoration: none;
  font-size: 1.4rem;
  background-color: black;
  color: white;
  cursor: pointer;
  border: 1px solid black;
  outline: none;
  position: relative;
  border-radius: 10px;
  flex-wrap: wrap;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: white;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    border-radius: 1rem;
  }

  &:hover::after {
    opacity: 0.7;
  }

  @media (max-width:768px) {
    padding: 5px;
    font-size: 1.2rem;
  }

  @media (min-width: 769px) {
    padding: 20px;
  }
`

const ContentWrapper = styled.div`
  margin: 0 auto;
  padding: 100px 15px 50px 15px;
  max-width: 52.25rem;
  width: 100%;
`

const PostingBtn = styled.div`
  display: flex;
  justify-content: right;
  max-width: 52.25rem;
  width: 100%;
  margin: 0 0.5rem 0.5rem 0
`

export default function Layout() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handlePostClick = () => {
    if (user?.uid === allowedUID) {
      navigate('/posting');
    } else {
      toast.error('권한이 없습니다.');
    }
  };

  return (
    <Wrapper>
      <Toaster />
      <LayoutWrapper>
        <Title to='/'>웹개발 수난시대</Title>
        <GoogleButton />
      </LayoutWrapper>
      <NavigationWrapper>
        <Text to='/algorithm'>알고리즘</Text>
        <Text to='/programming'>프로그래밍</Text>
        <Text to='/project'>프로젝트</Text>
        <Text to='/cs'>CS지식</Text>
        <Text to='/techtrend'>기술동향</Text>
      </NavigationWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <PostingBtn>
        <Text onClick={handlePostClick}>작성하기</Text>
      </PostingBtn>
    </Wrapper>
  )
}