import '../styles/home.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import { useState } from 'react';
import { Steps } from 'rsuite';

import axios from 'axios';
import SideNIC from '../components/sideNIC';
import { useAuthContext } from "@asgardeo/auth-react";


export default function NIC() {
    const [nic, setNic] = useState('');
    const [statestep,setState]=useState(0)
    const [currentStatus,setCurrentStatus]=useState('pending')

    const {
      state,
      signIn,
      signOut,
      getBasicUserInfo,
      getIDToken,
      getDecodedIDToken,
      on
    } = useAuthContext();

    const changenic = (e) => {
        setNic(e.target.value)


        //console.log(nic)
    }

    const submitID = () => {
      
var newid=string(nic);
      console.log("Testing 2",state.email)
      const accessToken=JSON.parse(localStorage.getItem("API_TOKEN")).access_token;
    
       axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/checkId',{ 
       params:{
        'nic':`${newid}`}, 
        
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
                            <Steps current={statestep} currentStatus={currentStatus}>
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