import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Algorithm from "./routes/algorithm"
import Home from "./routes/home"
import DevTip from "./routes/devTip"
import Project from "./routes/project"
import TechInsight from "./routes/techInsight"
import TechStack from "./routes/techStack"
import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useState, useEffect } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"

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
        path: 'devtip',
        element: <DevTip />
      },
      {
        path: 'project',
        element: <Project />
      },
      {
        path: 'techinsight',
        element: <TechInsight />
      },
      {
        path: 'techstack',
        element: <TechStack />
      },
      {
        path: 'techtrend',
        element: <Algorithm />
      },
    ]
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
