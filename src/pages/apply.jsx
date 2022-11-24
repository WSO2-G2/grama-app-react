import TopBar from '../components/topbar';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


import '../styles/apply.css';
import Side from '../components/side';
import { Link, useHistory } from 'react-router-dom';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from "@asgardeo/auth-react";

export default function Apply() {

  const [nics, setNic] = useState('');
  let history = useHistory();

  const MySwal = withReactContent(Swal)

  const {
    state,
    signIn,
    signOut,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
    on
  } = useAuthContext();

  const [file, setFile] = useState();
  const [add1, setAdd1] = useState('')
  const [name, setName] = useState('')
  const [add2, setAdd2] = useState('');
  const [tpnumber, setTpnumber] = useState('');
  const [proof, setProof] = useState('')
  const [imgURL, setImgURL] = useState('https://th.bing.com/th/id/R.213f89705b9194fad522ce482a2f380d?rik=9QchXovylf%2fFwg&riu=http%3a%2f%2fsilkbrassband.co.uk%2fimages%2fno-image-selected.png&ehk=xlxWhDE0BgrkYOymeMxfDg19OoKsofQBsH24CBcYVKg%3d&risl=&pid=ImgRaw&r=0');
  const [localImg, setLocalImg] = useState(imgURL);
  
  if(!localStorage.getItem('state')){
    history.push('/');
  }

  useEffect(() => {

    // if (!state?.isAuthenticated) {
    //   history.push("/");
    //   return;
    // }

    const nic = localStorage.getItem('nic')
    const accessToken = JSON.parse(localStorage.getItem("API_TOKEN")).access_token;
    console.log(nic)
    axios.get('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/getdetails', {
      params: {
        'nic': `${nic}`
      },

      headers: {
        'Authorization': `Bearer ${accessToken}`,

      }
    }).then((response) => {
      console.log(response.data)
      setName(response.data.name)
    })
    setNic(nic)
  }, [])

  async function handleSubmit(e) {
    console.log(add1)


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
        setImgURL(res.url);
        console.log("Emaiiaia")
        sendPost();
      })
      .catch(err => console.log(err));




  }

  const sendPost = () => {
    console.log(nics, add1, add2, imgURL, tpnumber, state.email)

    const accessToken = JSON.parse(localStorage.getItem("API_TOKEN")).access_token;
    axios.post('https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/addresscheck/1.0.0/addRequest', {

      'nic': `${nics}`,
      'address': `${add1} ${add2}`,
      'image': `${imgURL}`,
      'status': `Pending`,
      'phone': `${tpnumber}`,
      'email': `${state.email}`,
      'name': `${name}`

    }, {

      headers: {
        'Authorization': `Bearer ${accessToken}`,

      }



    })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Form Submitted Sucessfully',
          text: 'Stay tuned!',
          // footer: '<a href="">Why do I have this issue?</a>'
        }).then(() => {
          window.location.href = "/options"
        })
        console.log(response.data)
      })

  }

  useEffect(() => {
    if (!file) {
      setLocalImg('https://th.bing.com/th/id/R.213f89705b9194fad522ce482a2f380d?rik=9QchXovylf%2fFwg&riu=http%3a%2f%2fsilkbrassband.co.uk%2fimages%2fno-image-selected.png&ehk=xlxWhDE0BgrkYOymeMxfDg19OoKsofQBsH24CBcYVKg%3d&risl=&pid=ImgRaw&r=0')
      return
    }

    const objectUrl = URL.createObjectURL(file[0])
    setLocalImg(objectUrl)

    // free memory when ever this component is unmounted
    // return () => URL.revokeObjectURL(objectUrl)
  }, [file])

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
                <input type="text" value={nics} readOnly />
                <label>Mobile Number</label>
                <input type="text" placeholder='Mobile Number' onChange={(e) => { setTpnumber(e.target.value) }} />
                <label>Current Address</label>
                <input type="text" placeholder='Address Line 1' onChange={(e) => { setAdd1(e.target.value) }} />

                <input type="text" placeholder='Address Line 2' onChange={(e) => { setAdd2(e.target.value) }} />

                <label>Address Proof</label>
                <input type="file" accept="image/png" onChange={(e) => { setFile(e.target.files) }} />
                {/* <CloudinaryContext cloudName="dwb3ufwzf">
                  <div>
                    <Image publicId={imgURL} width="50" />
                  </div>
                </CloudinaryContext> */}
                <div>
                  <img src={localImg} width="50" />
                </div>
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