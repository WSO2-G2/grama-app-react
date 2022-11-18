import '../styles/status.css';
import TopBar from '../components/topbar';
import Side from '../components/side';

import { Steps } from 'rsuite';
import { Link } from 'react-router-dom';
import { useState ,useEffect} from 'react';

export default function Status() {

  let msg = "loading.."

  const [name, setname] = useState(msg);
  const [NIC, setNIC] = useState(msg);
  const [identityCheck, setidentityCheck] = useState(msg);
  const [addressCheck, setaddressCheck] = useState(msg);
  const [policeCheck, setpoliceCheck] = useState(msg);


  useEffect(() => {
    
    // 1. check if identity check is ok
      // 2. check if address check is ok
      // 3. check if police check is ok

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
            <form>
              <div className='st-content'>
                <h2>Application Status</h2>
                <p>Name</p>
                <p>NIC or Passport No</p>
               
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
          <img src='/status.PNG' width="500px" height="500px" style={imgStyle}/>
          </div>

        </div>
      </div>
    </>
  );
}