import React, { useState,useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast } from 'react-toastify';
import {aylargetir,islemgetir,reset,yillargetir} from "../features/IslemSlice"
const FormAlani = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [isim,setisim]=useState("")
    const [deger,setdeger]=useState("")
    const [tip,settip]=useState("gelir")
    const [secilanay,setsecilanay]=useState("Ocak")
    const [secilenyil,setsecilenyil]=useState("2023")

    const {aylar,yillar}=useSelector((state)=>state.islem)
    const {user}=useSelector((state)=>state.auth)
    useEffect(()=>{
        dispatch(aylargetir())
        dispatch(yillargetir())
        dispatch(reset())
    },[])

    const handle=async(e)=>{
        e.preventDefault()
       
      if(dispatch){
        toast.success("Ekleme işlemi başarılı")
      }
      await dispatch(islemgetir({
        isim,
        deger,
        tip,
        secilanay,
        secilenyil,
        email:user.email
    }))
    }
  return (
    <div className='container-form'>
          <div className='baslik'>
          <h3>Bütçe İçin Giriş İşlemi</h3>
          </div>
           <form action="" onSubmit={handle}>
            <label htmlFor="isim">İsim</label>
            <input type="text" name="isim" id="" required onChange={(e)=>setisim(e.target.value)} />
            <label htmlFor="number">Değer</label>
            <input type="number" name="number" id="" required onChange={(e)=>setdeger(e.target.value)}/>
            <label htmlFor="" className='custom'>
                <span>Tip:</span>
                <select required onChange={(e)=>settip(e.target.value)}>
                    <option value="Gider">Gider</option>
                    <option value="Gelir">Gelir</option>
                </select>
            </label>
            <label htmlFor="" className='custom'>
                <span>Aylar:</span>
                <select required onChange={(e)=>setsecilanay(e.target.value)}>
                    {aylar && aylar.map(ay=>(
                        <option key={ay.id} value={ay.ad}>{ay.ad}</option>
                    ))}
                </select>
            </label>
            <label htmlFor="" className='custom'>
                <span>Yıllar:</span>
                <select required onChange={(e)=>setsecilenyil(e.target.value)}>
                    {yillar && yillar.map(yil=>(
                        <option key={yil.id} value={yil.ad}>{yil.ad}</option>
                    ))}
                </select>
            </label>
            <button className='btn'>İşlem Ekle</button>
           </form>
    </div>
  )
}

export default FormAlani