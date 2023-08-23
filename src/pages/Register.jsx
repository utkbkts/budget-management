import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { register,reset } from "../features/Authslice";
import Spinner from "../components/Spinner";
const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName,setdisplayName]=useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

const {user,isLoading,message,isSuccess,isError}=useSelector((state)=>state.auth)



  const handleSubmit = (e) => {
    e.preventDefault()
    
    const userdata={
      email,
      displayName,
      password
    }
      dispatch(register(userdata));
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
    {isLoading ? <Spinner />:(
  <form onSubmit={handleSubmit} className="login-form">
  <div className='baslik'>
  <h2>Üyelik Sayfası</h2>
  </div>
  <label>
    <span>Kullanıcı Adı:</span>
    <input 
      type="text" 
      onChange={(e) => setdisplayName(e.target.value)} 
      value={displayName} 
    />
  </label>
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
  <button className="btn" type="submit">{isLoading ? 'Üye Olunuyor...' : 'Üye Ol'}</button>
  </div>
</form>
    )}
  
  </>
  )
}

export default Register