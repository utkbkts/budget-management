import {auth} from '../firebase/Firebase'
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,signOut} from 'firebase/auth'

const register =async (email,parola,kullaniciAd)=>{

    const userResponse=await createUserWithEmailAndPassword(auth,email,parola)

    if(userResponse.user){

        await updateProfile(userResponse.user,{
            displayName:kullaniciAd
        })
		
        localStorage.setItem('user',JSON.stringify(userResponse.user))
    }

    return userResponse.user
}
const login = async (email,parola)=>{
    const userresponse =await signInWithEmailAndPassword(auth,email,parola);

    if(userresponse.user){
        localStorage.setItem("user",JSON.stringify(userresponse.user))
    }

    return userresponse.user
}

const logout=async()=>{
    await signOut(auth)
    localStorage.removeItem("user")
}

const authService={
    register,
    login,
    logout
}

export default authService