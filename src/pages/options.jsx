import '../styles/options.css';
import TopBar from '../components/topbar';
import Side from '../components/side';


import './index.css'; 
import { Link , useHistory} from 'react-router-dom';


export default function Options() {
  // useEffect(()=>{
  //   console.log("Hello")
  //   axios.get('http://localhost:9090/getalldetails?nic=98790005v', {
      
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   });
  // },[])

  const history = useHistory();
  
  if(!localStorage.getItem('state')){
    history.push('/');
  }

  return (
    <>
    <TopBar />
    <div className="options">
      <div className='content'>
        <div className='contentOne'>
          <div className='opt-content'>

            {/* <a href="/apply">Apply for the Grama Certificate &rarr;</a> */}

            <Link to={"/nic"}>Apply for the Grama Certificate</Link>

            {/* <Link to={"/apply"}>Apply for the Grama Certificate &rarr;</Link> */}

            {/* <a href="/status/appId">Check Status &rarr;</a> */}
            <Link to={"/status/appId"}>Check Status &rarr;</Link>

            {/* <a href="#">Help &rarr;</a> */}
            <Link to={"/help"}>Help &rarr;</Link>

            

          </div>
          {/* <a href="/">Back</a> */}
          <Link to={"/"} className='backButton'>Back</Link>

        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  );
}