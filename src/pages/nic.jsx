import '../styles/home.css';
import TopBar from '../components/topbar';
import Side from '../components/side';
import { useState } from 'react';
import { Steps } from 'rsuite';

import axios from 'axios';
import SideNIC from '../components/sideNIC';


export default function NIC() {
    const [nic, setNic] = useState('');

    const changenic = (e) => {
        setNic(e.target.value)


        //console.log(nic)
    }

    const submitID = () => {
        let config = {
            headers: {
                //'Authorization': 'Bearer ' + validToken()
                'API-Key': 'eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzY2IzNmFjNy0wMTgyLTQwOGMtYmZhYy1lOTk1ZTA4ZjI4ZjNAY2FyYm9uLnN1cGVyIiwiaXNzIjoiaHR0cHM6XC9cL3N0cy5jaG9yZW8uZGV2OjQ0M1wvb2F1dGgyXC90b2tlbiIsImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJpZGVudGl0eUNoZWNrIiwiY29udGV4dCI6IlwvN2ZhMmMxYTQtMmJmYy00YzU4LTg5OWYtOTU2OWMxMTIxNTBiXC9kZHJxXC9pZGVudGl0eWNoZWNrXC8xLjAuMCIsInB1Ymxpc2hlciI6ImNob3Jlb19wcm9kX2FwaW1fYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjpudWxsfV0sImV4cCI6MTY2ODgwNzYyMywidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwiaWF0IjoxNjY4NzQ3NjIzLCJqdGkiOiI0MDk2YjU0MS03MDkyLTRkYzktOWMzMi04M2M0MTYwYmFkNTAifQ.exkk44bZWfMFA0brjgE9kHU-534XMc7wRGg-crOwdzhn7Ki84o8TIOlIQesn7qNDT_tKj_wbAf1Nysi1bng1tbHZdki-KjVdLDWic38V-kUfGjepdC747zogw_gzXGco0m5x5EE_vDbnjFe1KdytIQzKZjFmdF-N3wv1ATPdSS1773GDejeLrcjcZolypcCofpVpqE9pzPM8bdztSScyJuQRW4QGW7gyDO3mTLCsB0JRZl9HhnU5rTS4ivGBvPe3usIBxmSILRpJZh1ATJty7vElM_8xeyAvsFadJFmkXpKMLMOakI5ncMef_O__9P38Bq6cl-s5AlAwDI_x4ilwzxodNmOS6m3Ti5HivZrvMcK_-6igxdPeUkLJ5guqigeFW63-Qnc03IRO2ygP-KE1TaJE-uFd9eme8dNNwN90_7TEvhLuamXM5f9MF-vd3bbGd3ZhUKOytKP9zGiGzjiZBTISPtgehytxkPh0zvS-Rexa-kEM5QWI78CaAuuqPdscU9R7ffVE0WoVEg9cPXbQvblMffKkKZt8gPeOav5Hpv8ud6KVW6S13aid6k_9A0vsl6dFI39B2MEuMj2qBdzsKuSJ8kfcR-x1KNrW8CSIKO_lC6V7ufDvO7QQCcQ5uMEhYPcVxRRhyhqqRwy9EPM6TcLCknBhjAqyYEDAgg75akQ',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'


            }
        }

        axios.get(
            `https://7fa2c1a4-2bfc-4c58-899f-9569c112150b-prod.e1-us-east-azure.choreoapis.dev/ddrq/identitycheck/1.0.0/checkId?nic=${nic}`,
            config
        )
            .then((response) => {
                console.log(response)
            })
        console.log(nic)
    }
    return (
        <>
            <TopBar />
            <div className="home">
                <div className='content'>
                    <div className='contentOne'>

                        {/* <label for="fname" className='labelnic'>Please Enter your nic</label> */}
                        <br></br>
                        <input type="text" id="fname" name="fname" onChange={changenic} value={nic} className='nicInput' placeholder='Please Enter your nic' />
                        <button onClick={submitID} className='nicBut'>Next</button>
                        <div className='stepsDiv'>
                            <Steps current={0} currentStatus="pending">
                                <Steps.Item title="Identity Check"/>
                                <Steps.Item title="Police Check" className='steps'/>


                            </Steps>
                        </div>
                    </div>

                    <div className='contentOne'>
                        <SideNIC />
                    </div>
                </div>
            </div>
        </>
    );
}