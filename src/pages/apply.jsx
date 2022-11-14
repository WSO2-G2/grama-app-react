import logo from '../logo.svg';
import TopBar from '../components/topbar';
import '../styles/apply.css';

export default function Apply() {
  return (
    <>
    <TopBar />
    <div className="apply">
      <div className='content'>
        <div className='contentOne'>
            <form>
                <div className='aply-content'>
      <h2>Apply for the Grama Certificate</h2>
                    <label>NIC or Passport No</label>
                    <input type="text" placeholder='NIC or Passpart No'/>
                    <label>Current Address</label>
                    <input type="text" placeholder='Address'/>
                    <label>Address Proof</label>
                    <input type="file" />
                    <img src='https://th.bing.com/th/id/R.213f89705b9194fad522ce482a2f380d?rik=9QchXovylf%2fFwg&riu=http%3a%2f%2fsilkbrassband.co.uk%2fimages%2fno-image-selected.png&ehk=xlxWhDE0BgrkYOymeMxfDg19OoKsofQBsH24CBcYVKg%3d&risl=&pid=ImgRaw&r=0'></img>
                </div>
            </form>
        </div>
        <div className='contentOne'>
          <img src='https://media.istockphoto.com/id/1290482722/vector/people-taking-documents-from-shelves.jpg?s=612x612&w=is&k=20&c=DW8oveHrghOYNxC0xilZDqpq38bfBE_RuyJ6o7UIk-8='></img>
        </div>
      </div>
    </div>
    </>
  );
}