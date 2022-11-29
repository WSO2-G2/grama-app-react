import '../styles/home.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import { Link } from "react-router-dom";
import { useState } from 'react';


export default function Help() {

  const [msg,setMsg] = useState('');

  const sendHelp = () => {
    console.log(msg);

    try{
      axios.post(
        'https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/slackhelpserviceapi/1.0.0/sendMessageToChannel',
        // '{\n  "msg": "Testing from OpenAPI console."\n}',
        {
            'msg': `${msg}`
        },
        {
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        }
      ).then((res)=>{
        console.log(res);
      })
    }catch(err){
      console.log(err);
    };
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
          <Link to={"/options"}>Back</Link>

        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  )
}
