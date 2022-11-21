import '../styles/status.css';
import TopBar from '../components/topbar';
import Side from '../components/side';

import { Steps } from 'rsuite';
import { Link, useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { setRef } from '@mui/material';
import { useAuthContext } from "@asgardeo/auth-react";

import { jsPDF } from "jspdf";
import { Loader } from 'rsuite';


export default function Status() {

  let msg = "loading.."

  let { appId } = useParams();
  console.log(appId);

  const [name, setname] = useState(msg);
  const [NIC, setNIC] = useState(msg);
  const [email, setemail] = useState();
  const [identityCheck, setidentityCheck] = useState(msg);
  const [addressCheck, setaddressCheck] = useState(msg);
  const [policeCheck, setpoliceCheck] = useState(msg);
  const {getBasicUserInfo} = useAuthContext();


  const createPDF = () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = document.querySelector("#pdf");
    pdf.html(data).then(() => {
      pdf.save(`gramaCertificate_${(new Date().toJSON().slice(0,10))}.pdf`);
    });
  };


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
  const imgStyle={
    marginTop:'-40px',
    marginLeft:'30px'
  }

  return (
    <>
      <TopBar />
      <div className="status">
        <div className='content'>
          <div className='contentOne'>
              <div className='st-content' id="pdf">
                <h2>Application Status</h2>
                <p>Name</p>
                <p>NIC or Passport No</p>
               
              </div>

              <div className='stepsDiv'>
              <Steps current={2} currentStatus="finish">
                  <Steps.Item title="Identity Check" />
                  <Steps.Item title="Police Check" />
                  <Steps.Item title="Address Check" icon={<Loader />}/>
                 
                </Steps>
              </div>
              {/* <a href="#" type='submit'>Get your Grama Certificate</a> */}
              <Link onClick={createPDF} to="#" type="button">Get your Grama Certificate</Link>
            <Link to={"/options"}>Back</Link>
          </div>
          <div className='contentOne'>
          <img src='/status.PNG' width="500px" height="500px" style={imgStyle}/>
          </div>

        </div>
      </div>
    </>
  );
}