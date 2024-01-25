import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { styled } from "styled-components"
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'

const Button = styled.span`
  background-color: white;
  color: black;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 50px;
  border:0;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width:768px) {
    font-size: 0;
    width: 2.5rem;
    gap: 0px;
  }

  @media (min-width: 769px) {
    font-size: 24px;
    width: 8rem;
  }
`

const Logo = styled.img`
  height: 20px;
`

export default function GoogleButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
      setUserName(user ? user.displayName : '');
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user.displayName;
      toast.success(`${user}님, 반갑습니다!`);
    } catch (error) {
      toast.error("로그인 실패: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success(`${userName}님, 안녕히 가세요!`);
      navigate("/");
    } catch (error) {
      toast.error("로그아웃 실패: " + error.message);
    }
  };

  const onClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  return (
    <>
      <Button onClick={onClick}>
        <Logo src="/google-icon.svg" />
        {isLoggedIn ? "Logout" : "Login"}
      </Button>
      <Toaster />
    </>
  );
}