import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Landing from './pages/Landing'
import DashBoard from './pages/DashBoard'
import Register from './pages/Register'
import Error from './pages/Error'


function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <DashBoard />
    },
    {
      path: '/landing',
      element: <Landing />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '*',
      element: <Error />
    }
  ])

  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
