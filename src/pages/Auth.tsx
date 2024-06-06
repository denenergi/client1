import { FC, useState } from 'react'
import { instance } from '../api/axios.api'
import { AuthSrvice } from '../services/auth.services'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/localstorage.helper'
import { useAppDispatch } from '../store/hooks'
import { login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Auth: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await AuthSrvice.login({email, password})
      if(data) {
        setTokenToLocalStorage('token', data.token)
        dispatch(login(data))
        toast.success('You logged in!')
        navigate('/')
      }
    } catch (err: any) {
      const error = err.response?.data.messages
      toast.error(error.toString())
    }
  }

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const data = await AuthSrvice.registration({ email, password })
      if (data) {
        toast.success('Account has been created!')
        setIsLogin(!isLogin)
      }
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error.toString())
    }
  }
  return (
    <div className='md-40 flex flex-col justify-center items-center bg-slate-900 text-white'>
      <h1 className="text-center mb-10 text-xl">
        {isLogin ? 'Login' : 'Registration'}
      </h1>

      <form
        action=""
        className="flex w-1/3 flex-col mx-auto gap-5"
        onSubmit={isLogin ? loginHandler : registrationHandler}
      >
        <input type="text" className="input" placeholder='Email' onChange={e => setEmail(e.target.value)} />
        <input type="password" className="input" placeholder='Password' onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-green mx-auto">Submit</button>
      </form>

      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button onClick={() => setIsLogin(!isLogin)} className='text-slate-300 hover:text-white'>You don't have an account</button>
        ) : (
          <button onClick={() => setIsLogin(!isLogin)} className='text-slate-300 hover:text-white'>Already have an account</button>
        )}
      </div>
    </div>
  )
}

export default Auth