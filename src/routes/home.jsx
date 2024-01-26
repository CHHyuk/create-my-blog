import styled from "styled-components"
import TypingAnimation from "../components/typing-animation"

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
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
  white-space: nowrap;
  overflow: hidden;
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
// 방문자 수 섹션
const VisitorStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 10rem;
  max-width: 26rem;
  width: 100%;
`
const VisitorTitle = styled.div`
  font-size: 1.5rem;
`

const Visiors = styled.div`
  display: flex;
  gap: 5rem
`

const TodayVisitors = styled.div`
  
`

const TotalVisitors = styled.div`
  
`

// 인기 게시글 섹션
const PopularPosts = styled.div`

`

// 라이브챗 섹션
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
          <TypingAnimation string={" 프론트엔드 개발자 장한혁의"} delay={1000} />
        </Myself>
        <BlogIntro>
          <TypingAnimation string={" 블로그입니다."} delay={2500} />
        </BlogIntro>
      </IntroSection>
      <VisitorStats>
        <VisitorTitle>
          <TypingAnimation string={" 방문자 수"} delay={4500} />
        </VisitorTitle>
        <Visiors>
          <TodayVisitors>
          <TypingAnimation string={` Today: `} delay={4800} /> 
          </TodayVisitors>
          <TotalVisitors>
          <TypingAnimation string={` Total: `} delay={4800} /> 
          </TotalVisitors>
        </Visiors>
      </VisitorStats>
      <PopularPosts>
        인기 게시글
      </PopularPosts>
      <LiveChat>
        실시간 채팅
      </LiveChat>
    </Wrapper>
  )
}