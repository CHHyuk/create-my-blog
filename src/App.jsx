import { RouterProvider, createBrowserRouter} from "react-router-dom"
import Layout from "./components/layout"
import Algorithm from "./routes/algorithm"
import Home from "./routes/home"
import Project from "./routes/project"
import TechInsight from "./routes/techInsight"
import TechStack from "./routes/techStack"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useState, useEffect } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"
import AlgorithmDetail from "./routes/algorithmDetail"
import ProjectDetail from "./routes/projectDetail"
import TechInsightDetail from "./routes/techInsightDetail"
import TechStackDetail from "./routes/techStackDetail"
import TechTrendDetail from "./routes/techTrendDetail"
import TechTrend from "./routes/techTrend"
import PostPage from "./routes/postPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'algorithm',
        element: <Algorithm />,
      },
      {
        path: 'algorithm/:id',
        element: <AlgorithmDetail />
      },
      {
        path: 'project',
        element: <Project />,
      },
      {
        path: 'project/:id',
        element: <ProjectDetail />
      },
      {
        path: 'techinsight',
        element: <TechInsight />,
      },
      {
        path: 'techinsight/:id',
        element: <TechInsightDetail />
      },
      {
        path: 'techstack',
        element: <TechStack />,
      },
      {
        path: 'techstack/:id',
        element: <TechStackDetail />,
      },
      {
        path: 'techtrend',
        element: <TechTrend />,
      },
      {
        path: 'techtrend/:id',
        element: <TechTrendDetail />,
      }
    ]
  },
  {
    path: '/posting',
    element: <PostPage />
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }

  body {
    background-color: black;
    color: white;
    font-family: 'Gamja Flower', cursive;
  }

  button {
    font-family: 'Gamja Flower', cursive;
    -webkit-appearance: none;
    -moz-appearance: none; 
    appearance: none; 
  }
  ::-webkit-scrollbar {
    display: none; 
  }

  a {
    text-decoration: none;
    color: white;
  }
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  }

  useEffect(() => { init(); }, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  )
}

export default App
