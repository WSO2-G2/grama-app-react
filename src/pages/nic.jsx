import '../styles/home.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import { useState } from 'react';
import { Steps } from 'rsuite';

import axios from 'axios';
import SideNIC from '../components/sideNIC';


export default function NIC() {
    const [nic, setNic] = useState('');

    const changenic = (e) => {
        setNic(e.target.value)


        //console.log(nic)
    }

    const submitID = () => {
      const accessToken=JSON.parse(localStorage.getItem("API_TOKEN")).access_token;
      console.log("Acess",accessToken)
       axios.post('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/addRecord',{ "userId": 0,
       "nic": "string",
       "name": "string"}, {
        
        headers: {
            'Authorization': `Bearer ${accessToken}`,
          
        }


     
    }).then((response) => {
   console.log(response.data)
  })

   
  
    }
    return (
        <>
            <TopBar />
            <div className="home">
                <div className='content'>
                    <div className='contentOne'>

                        {/* <label for="fname" className='labelnic'>Please Enter your nic</label> */}
                        <br></br>
                        <input type="text" id="fname" name="fname" onChange={changenic} value={nic} className='nicInput' placeholder='Please Enter your nic' />
                        <button onClick={submitID} className='nicBut'>Next</button>
                        <div className='stepsDiv'>
                            <Steps current={0} currentStatus="pending">
                                <Steps.Item title="Identity Check"/>
                                <Steps.Item title="Police Check" className='steps'/>


                            </Steps>
                        </div>
                    </div>

                    <div className='contentOne'>
                        <SideNIC />
                    </div>
                </div>
            </div>
        </>
    );
}