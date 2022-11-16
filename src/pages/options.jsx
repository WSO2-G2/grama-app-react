import '../styles/options.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import axios from 'axios';
import { useEffect } from 'react';

import './index.css'; 


export default function Options() {
  // useEffect(()=>{
  //   console.log("Hello")
  //   axios.get('http://localhost:9090/getalldetails?nic=98790005v', {
      
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   });
  // },[])
  return (
    <>
    <TopBar />
    <div className="options">
      <div className='content'>
        <div className='contentOne'>
          <div className='opt-content'>
            <a href="/apply">Apply for the Grama Certificate &rarr;</a>
            <a href="/status/appId">Check Status &rarr;</a>
            <a href="#">Help &rarr;</a>
            
          </div>
          <a href="/">Back</a>
        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  );
}