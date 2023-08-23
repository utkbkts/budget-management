import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormAlani from './FormAlani';
import moment from "moment"
import "moment/locale/tr"
import { son10islemgetir } from '../features/IslemSlice';
const Home = () => {
const dispatch = useDispatch()
const navigate=useNavigate()

const {user} =useSelector((state)=>state.auth)
const {islemler}=useSelector((state)=>state.islem)
useEffect(()=>{
  if(!user){
    navigate("/login")
  }

  if(user){
    dispatch(son10islemgetir(user.email))
  }

},[user,navigate])

  return (
    <div className='container-home'>
      <div className='home-left'>
        {islemler && islemler.map(islem=>(
          <div className='home-left-content'>
          <h2 key={islem.id}>Oluşturan:{islem.isim}</h2>
          <h2>Oluşturan email:{islem.email}</h2>
          <div>
            <span>Tip: {islem.tip}</span>
            <span>Değer: {islem.deger}</span>
          </div>
          <div>
            <span>Ay: {islem.secilanay}</span>
            <span>Yıl: {islem.secilenyil}</span>
          </div>
          <span>Tarih: {moment(new Date(islem.tarih.toDate())).locale('tr').format('L')}</span>
          </div>
        )) }
      </div>
      <div className='home-right'>
        <FormAlani/>
      </div>
    </div>
  )
}

export default Home