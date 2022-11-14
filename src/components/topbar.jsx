import logo from '../logo.svg';
import '../styles/topbar.css'

export default function TopBar() {
  return (
    <div className='topBar'>
      <div className='topLeft'>
        <h2>Grama App</h2>
      </div>
      <div className="topRight">
        <ul className='topList'>
          <li><a href="#">Sign In</a></li>
        </ul>
      </div>
    </div>
  );
  }