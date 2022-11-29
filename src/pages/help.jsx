import '../styles/home.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import { Link } from "react-router-dom";
import { useState } from 'react';


export default function Help() {

  const [msg,setMsg] = useState('');

  const sendHelp = () => {
    console.log(msg);
  }

  return (
    <>
    <TopBar />
    <div className="home">
      <div className='content'>
        <div className='contentOne'>
          <p>Get your help from our Slack Developers Community ...</p>
          {/* <a href="/options">Go &rarr;</a> */}

          <input type="text" id="msg" name="msg" onChange={(e)=>{setMsg(e.target.value)}} className='nicInput' placeholder='Enter your enquiry' />
          <button onClick={sendHelp} className='nicButton'>Send</button>

        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  )
}
