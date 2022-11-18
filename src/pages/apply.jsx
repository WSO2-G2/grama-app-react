import TopBar from '../components/topbar';
import '../styles/apply.css';
import Side from '../components/side';
import { Link } from 'react-router-dom';
import {CloudinaryContext, Image} from 'cloudinary-react';
import {cloudinary} from 'cloudinary-core';
// import cloudinary from 'cloudinary';
import { useState } from 'react';
import axios from 'axios';

export default function Apply() {

  const [file, setFile] = useState();
  // var cl = new cloudinary.Cloudinary({cloud_name: "dwb3ufwzf", secure: true});

  function handleSubmit(e){
    e.preventDefault();
    console.log(file[0]);
    console.log(file[0].name);

    // axios.post({
    //   baseURL: 'https://api.cloudinary.com/v1_1/dwb3ufwzf/image/upload',
    //     auth:{
    //       api_key: '747911715728242',
    //     },
    //     data: {
    //       file: file.name,
    //     }
    //   }
    // ).then(res=>console.log(res));

  }

  return (
    <>
    <TopBar />
    <div className="apply">
      <div className='content'>
        <div className='contentOne'>
            <form onSubmit={handleSubmit}>
                <div className='aply-content'>
      <h2>Apply for the Grama Certificate</h2>
                    <label>NIC or Passport No</label>
                    <input type="text" placeholder='NIC or Passport No'/>
                    <label>Current Address</label>
                    <input type="text" placeholder='Address'/>
                    <label>Address Proof</label>
                    <input type="file" onChange={(e)=>{setFile(e.target.files)}}/>
                    <img src='https://th.bing.com/th/id/R.213f89705b9194fad522ce482a2f380d?rik=9QchXovylf%2fFwg&riu=http%3a%2f%2fsilkbrassband.co.uk%2fimages%2fno-image-selected.png&ehk=xlxWhDE0BgrkYOymeMxfDg19OoKsofQBsH24CBcYVKg%3d&risl=&pid=ImgRaw&r=0'></img>
                <CloudinaryContext cloudName="dwb3ufwzf">
                  <div>
                    <Image publicId="cld-sample-4" width="50" />
                  </div>
                </CloudinaryContext>
                </div>
                {/* <a href="#" type='submit'>Apply</a> */}
                <Link onClick={handleSubmit} >Apply</Link>
            </form>
            {/* <a href="/options" className='backbtn'>Back</a> */}
            <Link to={"/options"}>Back</Link>

        </div>
        <div className='contentOne'>
          <Side />
        </div>
      </div>
    </div>
    </>
  );
}