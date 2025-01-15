import useMakeNavigation from "./Hooks/Common/NavigationHooks/useMakeNavigation"
import { RouterProvider } from "react-router-dom"

function App() {

  const { router } = useMakeNavigation()

  return (

    <>
      <RouterProvider router={router} />
    </>
  )

}

export default App
