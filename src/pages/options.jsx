import '../styles/options.css';
import TopBar from '../components/topbar';
import Side from '../components/side';


import './index.css'; 
import { Link } from 'react-router-dom';



export default function Options() {
  // useEffect(()=>{
  //   console.log("Hello")
  //   axios.get('http://localhost:9090/getalldetails?nic=98790005v', {
      
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   });
  // },[])
  return (
    <>
    <TopBar />
    <div className="options">
      <div className='content'>
        <div className='contentOne'>
          <div className='opt-content'>

            {/* <a href="/apply">Apply for the Grama Certificate &rarr;</a> */}
            <Link to={"/apply"}>Apply for the Grama Certificate</Link>
            {/* <a href="/status/appId">Check Status &rarr;</a> */}
            <Link to={"/status/appId"}>Check Status</Link>

            {/* <a href="#">Help &rarr;</a> */}
            <Link to={"/help"}>Help</Link>


          </div>
          {/* <a href="/">Back</a> */}
          <Link to={"/"}>Back</Link>

        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  );
}