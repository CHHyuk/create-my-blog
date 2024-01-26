import styled from "styled-components"
import TypingAnimation from "../components/typing-animation"

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`
// 소개 섹션
const IntroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  max-width: 26rem;
  width: 100%;
`

const Greeting = styled.div`
  width: 70%;
  font-size: 2rem;
  text-align: left;
`

const Myself = styled.div`
  font-size: 2rem;
`

const BlogIntro = styled.div`
  width: 70%;
  font-size: 2rem;
  text-align: right;
`

const PopularPosts = styled.div`

`

const VisitorStats = styled.div`

`

const LiveChat = styled.div`

`

export default function Home() {
  return (
    <Wrapper>
      <IntroSection>
        <Greeting>
          <TypingAnimation string={" 안녕하세요"} delay={0} />
        </Greeting>
        <Myself>
          <TypingAnimation string={" 프론트엔드 개발자 장한혁의"} delay={1500}/>
        </Myself>
        <BlogIntro>
          <TypingAnimation string={" 블로그입니다."} delay={5000}/>
        </BlogIntro>
      </IntroSection>
      <PopularPosts>
        인기 게시글
      </PopularPosts>
      <LiveChat>
        실시간 채팅
      </LiveChat>
      <VisitorStats>
        방문자 수
      </VisitorStats>
    </Wrapper>
  )
}