import '../styles/home.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import { Link } from "react-router-dom";

export default function Home() {


  return (
    <>
    <TopBar />
    <div className="home">
      <div className='content'>
        <div className='contentOne'>
          <p>Welcome!, Get your Grama Certificate and verify yourselves in a flash</p>
          {/* <a href="/options">Go &rarr;</a> */}
          <Link to={"/options"}>Go</Link>
        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  );
}