import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { styled } from "styled-components"
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'

const Button = styled.span`
  width: 8rem;
  background-color: white;
  color: black;
  font-weight: 700;
  font-size: 24px;
  padding: 10px 20px;
  border-radius: 50px;
  border:0;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
      await signInWithPopup(auth, provider);
      toast.success(`${userName}님, 반갑습니다!`);
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