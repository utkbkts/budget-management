import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {login,reset} from "../features/Authslice"
import Spinner from '../components/Spinner'
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()

const {user,isLoading,message,isSuccess,isError}=useSelector((state)=>state.auth)




  const handleSubmit = (e) => {
    e.preventDefault()

    const userdata={
      email,
      password
    }
    dispatch(login(userdata))
  }
  useEffect(()=>{

    if(isError){
      toast.error('Bir hata oluştu', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    if(isSuccess || user){
      navigate("/")
    }
    if(isLoading === false){
      dispatch(reset())
    }
  },[user,isLoading,isError,isSuccess,message,navigate,dispatch])
  return (
  <>
    {isLoading ? <Spinner />:(  <form onSubmit={handleSubmit} className="login-form">
    <div className='baslik'>
    <h2>Giriş Sayfası</h2>
    </div>
    <label>
      <span>Email:</span>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email}
      />
    </label>
    <label>
      <span>Parola:</span>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
    </label>
    <div className='button'>
    <button className="btn">Giriş Yap</button>
    </div>
    <ToastContainer />
  </form>)}  
  </>
  )
}

export default Login