import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Algorithm from "./routes/algorithm"
import Home from "./routes/home"
import Project from "./routes/project"
import Programming from "./routes/programming"
import CS from "./routes/cs"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useState, useEffect } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"
import AlgorithmDetail from "./routes/algorithmDetail"
import ProjectDetail from "./routes/projectDetail"
import ProgrammingDetail from "./routes/programmingDetail"
import CSDetail from "./routes/csDetail"
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
        path: 'programming',
        element: <Programming />,
      },
      {
        path: 'programming/:id',
        element: <ProgrammingDetail />
      },
      {
        path: 'cs',
        element: <CS />,
      },
      {
        path: 'cs/:id',
        element: <CSDetail />,
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

  .toastui-editor-contents {
    background-color: #707070;
    padding: 0.2rem 1rem;
    border-radius: 1rem;
  }

  .toastui-editor-contents pre {
    background-color: #3d3d3d;
  }
  .toastui-editor-contents blockquote {
    background-color: #272727;
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
