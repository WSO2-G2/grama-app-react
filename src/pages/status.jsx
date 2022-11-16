import '../styles/status.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import { Link } from 'react-router-dom';
import { useState } from 'react';


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


  return (
    <>
    <TopBar />
    <div className="status">
      <div className='content'>
        <div className='contentOne'>
            <form>
                <div className='st-content'>
                    <h2>Application Status</h2>
                    <p>Name: {name}</p>
                    <p>NIC or Passport No: {NIC}</p>
                    <p>Identity Check status: {identityCheck}</p>
                    <p>Police Check status: {policeCheck}</p>
                    <p>Address Check status: {addressCheck}</p>
                    <p>if all checks are approved</p>
                </div>
                <a href="#" type='submit'>Get your Grama Certificate</a>
            </form>
            {/* <a href="/options">Back</a> */}
            <Link to={"/options"}>Back</Link>
        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  );
}