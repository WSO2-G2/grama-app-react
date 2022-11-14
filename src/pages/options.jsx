import logo from '../logo.svg';
import '../styles/options.css';
import TopBar from '../components/topbar';

export default function Options() {
  return (
    <>
    <TopBar />
    <div className="options">
      <div className='content'>
        <div className='contentOne'>
          <div className='opt-content'>
            <a>Apply for the Grama Certificate &rarr;</a>
            <a>Check Status &rarr;</a>
            <a>Help &rarr;</a>
          </div>
        </div>
        <div className='contentOne'>
          <img src='https://media.istockphoto.com/id/1290482722/vector/people-taking-documents-from-shelves.jpg?s=612x612&w=is&k=20&c=DW8oveHrghOYNxC0xilZDqpq38bfBE_RuyJ6o7UIk-8='></img>
        </div>
      </div>
    </div>
    </>
  );
}