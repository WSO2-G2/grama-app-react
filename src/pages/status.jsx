import logo from '../logo.svg';
import '../styles/status.css';
import TopBar from '../components/topbar';

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
          <img src='https://media.istockphoto.com/id/1290482722/vector/people-taking-documents-from-shelves.jpg?s=612x612&w=is&k=20&c=DW8oveHrghOYNxC0xilZDqpq38bfBE_RuyJ6o7UIk-8='></img>
        </div>
      </div>
    </div>
    </>
  );
}