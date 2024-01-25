import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Algorithm from "./routes/algorithm"
import Home from "./routes/home"
import DevTip from "./routes/devTip"
import Project from "./routes/project"
import TechInsight from "./routes/techInsight"
import TechStack from "./routes/techStack"

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children : [
      {
        path:'',
        element: <Home />,
      },
      {
        path:'algorithm',
        element: <Algorithm />,
      },
      {
        path:'devtip',
        element: <DevTip />
      },
      {
        path:'project',
        element: <Project />
      },
      {
        path:'techinsight',
        element: <TechInsight />
      },
      {
        path:'techstack',
        element: <TechStack />
      },
      {
        path:'techtrend',
        element: <Algorithm />
      },
    ]
  }
]) 

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
