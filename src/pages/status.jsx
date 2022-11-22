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
import axios from 'axios';


export default function Status() {

  let msg = "loading.."

  let { nic } = useParams();
  console.log(nic);

  const [name, setname] = useState(msg);
  const [NIC, setNIC] = useState(msg);
  const [email, setemail] = useState();
  const [identityCheck, setidentityCheck] = useState(false);
  const [addressCheck, setaddressCheck] = useState('pending');
  const [policeCheck, setpoliceCheck] = useState(false);
  const {getBasicUserInfo} = useAuthContext();
  const accessToken = JSON.parse(localStorage.getItem("API_TOKEN")).access_token;
  //const accessToken = 'eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI1YTlkODIwMC0wNTA4LTRkNTQtYmM0My0zN2U1MzhjMWM5MDJAY2FyYm9uLnN1cGVyIiwiaXNzIjoiaHR0cHM6XC9cL3N0cy5jaG9yZW8uZGV2OjQ0M1wvb2F1dGgyXC90b2tlbiIsImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJhZGRyZXNzQ2hlY2siLCJjb250ZXh0IjoiXC83ZmEyYzFhNC0yYmZjLTRjNTgtODk5Zi05NTY5YzExMjE1MGJcL2RkcnFcL2FkZHJlc3NjaGVja1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJjaG9yZW9fcHJvZF9hcGltX2FkbWluIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6bnVsbH1dLCJleHAiOjE2NjkxNDQxODYsInRva2VuX3R5cGUiOiJJbnRlcm5hbEtleSIsImlhdCI6MTY2OTA4NDE4NiwianRpIjoiM2QxODdiZDQtYzQwNy00NjNhLWI0MmUtYzYwNGVmMjUzMGJkIn0.jfWHRHK0O_YFus0PThMYMCgrX0bxu9WGIQMKt57PmLWGUodHbd0H4Yqrp7Nob_weNnYjn4xDJjpu5baQA_WlQhzcv-iTk2WlFKUvoh9mzPDclLVPcGMZ8isxUQ7Xr12voLoS73lk3dfHr6AZR6_8u4BubCFMqwAt6NqFwebjmwbI3XE0aG7KXtpMd1_u_AfIDFOO30BhAPmfP8A7Mcf4YLy7PhNFLSHUKtVqQ3kNRZ5zlXjvZpO2tPtgih0DoqgRdyH0qaUwx9OAxZbhb9QuBdZ-MxBNsyhW-jRmkzfnRa7xDDE-mefccijB7zSZW6GBWxyigg7fGaZRmKiu5qu5flXNMg5WB1wa8zvgwNJwyh3dqxRUmPW18FFly-SokzrVC3gZ8WFW1sSFFBXeniSSKuNqIQGs_jd6014EYl5QlIMv5fSXdWFF2RxE0H5EHehruIJ5HdgH36WbTLGEXZ4UXS4P2aI95nxfAa04TkR-A9R-obhBszqAj8noi0RudxrC-4h7PWAWE1eBrSriTfIZMPnjfjpnhG5f77Rgms5yokepA79Kw9HXK8n1V-aOX3TJrb-Fq0U1KVL6XlyhBYNKiebEVFJl6ik_pKd7eBB4ipghqBRgziwLALvRSxj590vAoh957kgCM--GRgk4iRhhpWZucYvaAcnisN2Jrr5jCLo';

  const [statestep, setState] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('pending');

  const createPDF = () => {
    var doc = new jsPDF()
    doc.setCreationDate(new Date())
    doc.setFontSize(22)
    doc.text(20, 20, 'Grama Certificate')
    doc.moveTo(0,20)
    doc.setFontSize(12)
    doc.text(20, 40, 'This is a computer generated Certificate that certifies the vertification details of the given person.', {maxWidth:'150'})
    doc.text(20, 70, 'Name : ', {maxWidth:'150'})
    doc.text(20, 80, 'NIC : ', {maxWidth:'150'})
    doc.text(20, 90, 'Address : ', {maxWidth:'150'})
    doc.text(20, 110, `Identity Check : ${(identityCheck)?'Verified & Validated':'Unidentified Identity'}`, {maxWidth:'150'})
    doc.text(20, 120, `Police Check : ${(policeCheck)?'Verified & No Crimes found':'Identified with Crimes on the Police records'}`, {maxWidth:'150'})
    doc.text(20, 130, `Address Check : ${addressCheck}`, {maxWidth:'150'})
    doc.text(20, 160, 'I cereby certify that the Identity, Police and Address check of the above specified person has been verified.', {maxWidth:'150'})
    doc.text(20, 180, 'Grama Niledari', {maxWidth:'150'})
    doc.setFontSize(10)
    doc.text(20, 250, `Generated on ${(new Date().toJSON().slice(0,10))} `, {maxWidth:'150',align:'left'})
    doc.save(`gramaCertificate_${(new Date().toJSON().slice(0,10))}.pdf`);
  };


  useEffect(() => {

    const getIdCheck = () => {
      let res=  axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/checkId?',{
        params: {
          // 'nic': `${newid}`
          'nic': `${nic}`
        },

        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      return res;
    }

    const getPoliceCheck = () => {
      let res = axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/policeccheck/1.0.0/getalldetails',{
        params: {
          // 'nic': `${newid}`
          'nic': `${nic}`
        },

        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      return res;
    }

    const getAddressCheck = () => {
      let res = axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/addresscheck/1.0.0/addressCheck?',{
        params: {
          // 'nic': `${newid}`
          'nic': `${nic}`
        },

        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      return res;
    }

    try{
      Promise.all([getIdCheck(),getPoliceCheck(),getAddressCheck()]).then(res=>{
        console.log(accessToken);
        console.log(res);
        let idCheck = res[0].data.body;
        let policeCheck = res[1].data.body;
        let addCheck = res[2].data.body;
        if(addCheck === 'rejected' || addCheck === 'approved'){
          setaddressCheck(addCheck);
          if(addCheck === 'rejected'){
            setCurrentStatus('error');
          }else{
            setState(3);
          }
        }
        if(idCheck === 'true'){
          setidentityCheck(true);
          setState(1);
        }else{
          setidentityCheck(false);
          setCurrentStatus('error');
        }
        if(policeCheck === 'true'){
          setpoliceCheck(true);
          setState(2);
        }else{
          setpoliceCheck(false);
          setCurrentStatus('error');
        }
      });
    }catch(err){
      console.log(accessToken);
      console.log(err);
    }
    

    // doChecks();

  }, [accessToken, nic]); 
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
                <div className='stepsDiv'>
                <Steps current={statestep} >
                  {/* <Steps.Item title="Identity Check" />
                  <Steps.Item title="Police Check" /> */}
                  {(identityCheck) ? <Steps.Item title="Identity Check" status="finish" /> : 
                  <Steps.Item title="Identity Check" status={currentStatus}/>}
                  {(policeCheck) ? <Steps.Item title="Police Check" status="finish" /> : 
                  <Steps.Item title="Police Check" status={currentStatus}/>}
                  {(addressCheck === 'pending') ? <Steps.Item title="Address Check" icon={<Loader />}/> : 
                  <Steps.Item title="Address Check" status={currentStatus}/>}
                </Steps>
                </div>
              </div>
              <Link onClick={createPDF} to="#" type="button">Get your Grama Certificate</Link>
            <Link to={"/options"}>Back</Link>
          </div>
          <div className='contentOne'>
          <img src='/status.png' width="500px" height="500px" style={imgStyle}/>
          </div>

        </div>
      </div>
    </>
  );
}