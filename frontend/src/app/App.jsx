import { AuthProvider } from './AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
