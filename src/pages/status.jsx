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

  let { nicp } = useParams();
  // console.log(nicp);

  const [name, setname] = useState(msg);
  const [username,setusername]=useState('')
  const [NIC, setNIC] = useState('');
  const [email, setemail] = useState();
  const [identityCheck, setidentityCheck] = useState(false);
  const [addressCheck, setaddressCheck] = useState('');
  const [policeCheck, setpoliceCheck] = useState(false);
  const { getBasicUserInfo } = useAuthContext();
  const accessToken = JSON.parse(localStorage.getItem("API_TOKEN")).access_token;

  const [statestep, setState] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('pending');
  const [idCheckStatus, setIdCheckStatus] = useState('')
  const [policeCheckStatus, setPoliceCheckStatus] = useState('')

  const createPDF = () => {
    var doc = new jsPDF()
    doc.setCreationDate(new Date())
    doc.setFontSize(22)
    doc.text(20, 20, 'Grama Certificate')
    doc.moveTo(0, 20)
    doc.setFontSize(12)


    doc.text(20, 40, 'This is a computer generated Certificate that certifies the vertification details of the given person.', { maxWidth: '150' })
    doc.text(20, 70, 'Name : ', { maxWidth: '150' })
    doc.text(20, 80, 'NIC : ', { maxWidth: '150' })
    doc.text(20, 90, 'Address : ', { maxWidth: '150' })
    doc.text(20, 110, `Identity Check : ${(identityCheck) ? 'Verified & Validated' : 'Unidentified Identity'}`, { maxWidth: '150' })
    doc.text(20, 120, `Police Check : ${(policeCheck) ? 'Verified & No Crimes found' : 'Identified with Crimes on the Police records'}`, { maxWidth: '150' })
    doc.text(20, 130, `Address Check : ${addressCheck}`, { maxWidth: '150' })
    doc.text(20, 160, 'I hereby certify that the Identity, Police and Address check of the above specified person has been verified.', { maxWidth: '150' })
    doc.text(20, 180, 'Grama Niledari', { maxWidth: '150' })

    doc.setFontSize(10)
    doc.text(20, 250, `Generated on ${(new Date().toJSON().slice(0, 10))} `, { maxWidth: '150', align: 'left' })
    doc.save(`gramaCertificate_${(new Date().toJSON().slice(0, 10))}.pdf`);
  };


  useEffect(() => {




  }, [accessToken, NIC]);



  const imgStyle = {
    marginTop: '-40px',
    marginLeft: '30px'
  }

  const [nic, setNic] = useState('');
  const [data, setData] = useState([]);
  const [statetrue, setStatetrue] = useState(false)
  const [stylediv, setStyle] = useState('styleNormal')

  const submitID = () => {
    console.log("Hiiii")
    setStyle('sucessStyle')

    setIdCheckStatus('pending');
    setPoliceCheckStatus('pending');
    
    const getIdCheck = () => {
      let res = axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/checkId?', {
        params: {
          // 'nic': `${newid}`

          'nic': `${NIC}`

        },

        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      return res;
    }

    const getPoliceCheck = () => {
      let res = axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/policeccheck/1.0.0/getalldetails', {
        params: {
          'nic': `${NIC}`
        },

        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      return res;
    }

    const getAddressCheck = () => {
      let res = axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/addresscheck/1.0.0/addressCheck?', {
        params: {
          // 'nic': `${newid}`

          'nic': `${NIC}`

        },

        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      return res;
    }


    const getnameDetails = () => {
      let res = axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/getdetails', {
        params: {
          // 'nic': `${newid}`

          'nic': `${NIC}`

        },

        headers: {
          'Authorization': `Bearer ${accessToken}`,
        }
      })
      return res;
    }

    try {
      Promise.all([getIdCheck(), getPoliceCheck(), getnameDetails()]).then(res => {

        console.log(accessToken);
        console.log(res);
        let idCheck = res[0].data.body;
        let policeCheck = res[1].data.body;
        let nameDetails = res[2].data;
        // let addCheck = res[2].data.body;
        console.log(nameDetails)

        // setStatetrue(true)
        setData(nameDetails)
        let addCheck = '';
        setIdCheckStatus('received');
        setPoliceCheckStatus('received');
        if (addCheck === 'rejected' || addCheck === 'approved') {
          setaddressCheck(addCheck);
          if (addCheck === 'rejected') {
            setCurrentStatus('error');
          } else {
            setState(3);
          }
        }
        if (idCheck === 'true') {
          setidentityCheck(true);
          setState(1);
        } else {
          setidentityCheck(false);
          setCurrentStatus('error');
        }
        if (policeCheck === 'true') {
          setpoliceCheck(true);
          setState(2);
        } else {
          setpoliceCheck(false);
          setCurrentStatus('error');
        }
      })
    } catch (err) {
      console.log(accessToken);
      console.log(err);
    }

  }

  const styleNormal = {
    // visibility: "hidden"
  }

  const sucessStyle = {
    opacity: '1'
  }
  return (
    <>
      <TopBar />
      <div className="status" >
        <div className='content'>
          <div className='contentOne' style={sucessStyle}>
            <div className='idaddbar'>
              <input type="text" placeholder='Enter Your  NIC' onChange={(e) => { setNIC(e.target.value) }} className='inputid' />
              <button onClick={submitID} className='nicBut' >Next</button >
            </div>
            {false &&
              <div className='st-content' id="pdf" style={styleNormal}>
                <h2>Application Status</h2>
                <p>Name</p><span>{username}</span>
                <p>NIC or Passport No</p><span>{NIC}</span>
                <div className='stepsDiv'>
                  <Steps current={statestep} >
                    {(idCheckStatus === 'pending') && <Steps.Item title="Identity Check" icon={<Loader />} />}
                    {(idCheckStatus === 'received') && ((identityCheck) ? <Steps.Item title="Identity Check" status="finish" /> :
                      <Steps.Item title="Identity Check" status={currentStatus} />)}
                    {/* {(identityCheck) ? <Steps.Item title="Identity Check" status="finish" /> :
       <Steps.Item title="Identity Check" status={currentStatus} />} */}
                    {(policeCheckStatus === 'pending') && <Steps.Item title="Police Check" icon={<Loader />} />}
                    {(policeCheckStatus === 'received') && ((policeCheck) ? <Steps.Item title="Police Check" status="finish" /> :
                      <Steps.Item title="Police Check" status={currentStatus} />)}
                    {/* {(policeCheck) ? <Steps.Item title="Police Check" status="finish" /> :
       <Steps.Item title="Police Check" status={currentStatus} />} */}
                    {(addressCheck === 'pending') ? <Steps.Item title="Address Check" icon={<Loader />} /> :
                      <Steps.Item title="Address Check" status={currentStatus} />}

                  </Steps>
                </div>
                <Link onClick={createPDF} to="#" type="button">Get your Grama Certificate</Link>
              </div>
            }

            {/* <Link onClick={createPDF} to="#" type="button">Get your Grama Certificate</Link> */}
            <Link to={"/options"}>Back</Link>
          </div>
          {/* <div className='contentOne'>
            <img src='/status.png' width="500px" height="500px" style={imgStyle} />
          </div> */}

        </div>
      </div>
    </>
  );
}
