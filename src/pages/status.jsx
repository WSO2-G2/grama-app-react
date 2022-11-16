import '../styles/status.css';
import TopBar from '../components/topbar';
import Side from '../components/side';

import { Steps } from 'rsuite';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setRef } from '@mui/material';
import { useAuthContext } from "@asgardeo/auth-react";

export default function Status() {

  let msg = "loading.."

  const [name, setname] = useState(msg);
  const [NIC, setNIC] = useState(msg);
  const [email, setemail] = useState();
  const [identityCheck, setidentityCheck] = useState(msg);
  const [addressCheck, setaddressCheck] = useState(msg);
  const [policeCheck, setpoliceCheck] = useState(msg);
  const {getBasicUserInfo} = useAuthContext();


  useEffect(() => {
    
    // 1. check if identity check is ok
      // 2. check if address check is ok
      // 3. check if police check is ok
    async function doChecks() {

      const basicUserInfo = await getBasicUserInfo();
      const email = basicUserInfo.email;
      setemail(email)

      try {

        let identityResp = await fetch("/identityAPI/" + email);
        let identityRespVal = identityResp.json();

        if(identityResp === true){
          let addressResp = await fetch("/addressAPI" + email);
          let addressRespVal = addressResp.json()
          setaddressCheck(addressRespVal)

          let policeResp = await fetch("/policeAPI" + email)
          let policeRespVal = await policeResp.json()
          setpoliceCheck(policeRespVal)
        }
        else{
          setidentityCheck("Identity Not Valid")
          setaddressCheck("Please verify identity first")
          setpoliceCheck("Please verify identity first")
        }
        
      } catch (error) {
        setidentityCheck("Error occured!!!")
        setaddressCheck("Error occured!!!")
        setpoliceCheck("Error occured!!!")
      }

    }

    doChecks();

  }, []); 


  return (
    <>
      <TopBar />
      <div className="status">
        <div className='content'>
          <div className='contentOne'>
            <form>
              <div className='st-content'>
                <h2>Application Status</h2>
                <p>Name</p>
                <p>NIC or Passport No</p>
                {/* <p>Identity Check status</p> */}
                {/* <p>Police Check status</p>
                <p>Address Check status</p>
                <p>if all checks are approved</p> */}
             
              </div>

              <div className='stepsDiv'>
              <Steps current={2} currentStatus="error">
                  <Steps.Item title="Identity Check" />
                  <Steps.Item title="Police Check" />
                  <Steps.Item title="Address Check" />
                 
                </Steps>
              </div>
              <a href="#" type='submit'>Get your Grama Certificate</a>
            </form>
            <a href="/options">Back</a>
          </div>
          <div className='contentOne'>
            <Side />
          </div>

        </div>
      </div>
    </>
  );
}