import React from "react";
import { render } from "react-dom";
import { AuthProvider } from "@asgardeo/auth-react";
// import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const Index = () => (
    <AuthProvider
        config={ {
            signInRedirectURL: "https://grama-app-react.vercel.app/",
            signOutRedirectURL: "https://grama-app-react.vercel.app/",
            clientID: "CJufdyKxTDrSXfCG3RIga6O9CtQa",
            baseUrl: "https://api.asgardeo.io/t/wso2grama",
            scope: [ "openid","profile" ]
        } }
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
);

render((<Index />), document.getElementById("root"));






// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './styles/index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
