import TopBar from '../components/topbar';
import '../styles/apply.css';
import Side from '../components/side';
import { Link } from 'react-router-dom';
import {CloudinaryContext, Image} from 'cloudinary-react';
import { useState } from 'react';
import axios from 'axios';

export default function Apply() {

  const [file, setFile] = useState();
  const [imgURL, setImgURL] = useState('https://th.bing.com/th/id/R.213f89705b9194fad522ce482a2f380d?rik=9QchXovylf%2fFwg&riu=http%3a%2f%2fsilkbrassband.co.uk%2fimages%2fno-image-selected.png&ehk=xlxWhDE0BgrkYOymeMxfDg19OoKsofQBsH24CBcYVKg%3d&risl=&pid=ImgRaw&r=0');

  async function handleSubmit(e){
    e.preventDefault();
    console.log(file[0]);
    console.log(file[0].name);

    const formData = new FormData();
    formData.append('file', file[0]);
    // replace this with your upload preset name
    formData.append('upload_preset', 'nmknlgjq');
    const options = {
      method: 'POST',
      body: formData,
    };
    console.log(options);

    // replace cloudname with your Cloudinary cloud_name
    return await fetch('https://api.Cloudinary.com/v1_1/dwb3ufwzf/image/upload', options)
      .then(res => res.json())
      .then(res => {
        setImgURL(res.public_id);
      })
      .catch(err => console.log(err));

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
                    <input type="file" accept="image/png" onChange={(e)=>{setFile(e.target.files)}}/>
                <CloudinaryContext cloudName="dwb3ufwzf">
                  <div>
                    <Image publicId={imgURL} width="50" />
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