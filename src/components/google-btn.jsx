import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { styled } from "styled-components"
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/google-icon.svg" />
      Login
    </Button>
  );
}