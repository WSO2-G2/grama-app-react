import '../styles/status.css';
import TopBar from '../components/topbar';
import Side from '../components/side';

export default function Status() {
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
                    <p>Identity Check status</p>
                    <p>Police Check status</p>
                    <p>Address Check status</p>
                    <p>if all checks are approved</p>
                </div>
                <a href="#" type='submit'>Get your Grama Certificate</a>
            </form>
            <a href="/options">Back</a>
        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  );
}