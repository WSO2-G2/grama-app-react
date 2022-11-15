import '../styles/options.css';
import TopBar from '../components/topbar';
import Side from '../components/side';

export default function Options() {
  return (
    <>
    <TopBar />
    <div className="options">
      <div className='content'>
        <div className='contentOne'>
          <div className='opt-content'>
            <a href="/apply">Apply for the Grama Certificate &rarr;</a>
            <a href="/status/appId">Check Status &rarr;</a>
            <a href="#">Help &rarr;</a>
          </div>
          <a href="/">Back</a>
        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  );
}