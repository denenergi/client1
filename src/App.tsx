import { RouterProvider } from "react-router-dom"
import { router } from "./router/router"
import { useAppDispatch } from "./store/hooks"
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper"
import { AuthSrvice } from "./services/auth.services"
import { login, logout } from "./store/user/userSlice"
import { useEffect } from "react"
import { toast } from "react-toastify"

function App() {
  const dispatch = useAppDispatch()
  const checkedAuth = async () => {
    const token = getTokenFromLocalStorage()

    try {
      if (token) {
        const data = await AuthSrvice.getProfile()
        if (data) {
          dispatch(login(data))
        } else {
          dispatch(logout())
        }
      }
    } catch (error: any) {
      const err = error.response?.data.messages
      toast.error(err.toString())
    }
  }

  useEffect(() => {
    checkedAuth()
  })
  return <RouterProvider router={router}/>
}

export default App
