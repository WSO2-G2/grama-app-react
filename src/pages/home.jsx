import logo from '../logo.svg';
import '../styles/home.css';
import ResponsiveAppBar from '../components/topbar';
import TopBar from '../components/topbar';

export default function Home() {
  return (
    <>
    <TopBar />
    <div className="home">
      <div className='content'>
        <div className='contentOne'>
          <p>Get your Grama Certificate and verify yourselves in a flash</p>
          <a>Go &rarr;</a>
        </div>
        <div className='contentOne'>
          <img src='https://media.istockphoto.com/id/1290482722/vector/people-taking-documents-from-shelves.jpg?s=612x612&w=is&k=20&c=DW8oveHrghOYNxC0xilZDqpq38bfBE_RuyJ6o7UIk-8='></img>
        </div>
      </div>
    </div>
    </>
  );
}