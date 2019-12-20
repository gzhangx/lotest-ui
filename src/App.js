import React, {useContext, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import server from './config.json';
import MainPage from './components/MainPage';
import CustomersPage from './components/Customers';
import AddCustomer from './components/AddCustomer';
import pick from 'lodash/pick';
import uuid from 'uuid';
import {MainContext} from './components/provider';
import {getInitAuthState, addAuthHdr} from './components/auth';

import { BrowserRouter, Route, Link } from 'react-router-dom';

function testfunc() {
  fetch(server.apiUrl+'/sendSMS', {
    method: 'post',
    //credentials: 'include',
    mode: 'cors',
    //credentials: 'include',
    headers: addAuthHdr({'Content-Type':'application/json'}),
    body: JSON.stringify({
      "message":"a message from gang 1 with save",
      "from":"+12162848800",
      "to":"+14043989999"
    })
   }).then(re=>{
     console.log("done send sms");
    console.log(re);
   }).catch(err=>{
     console.log(err);
   });
}

class About extends React.Component {
  render() {
     return (
        <div>
           <h1>About...</h1>
        </div>
     )
  }
}

function App() {
  const url = server.url;
  const [authInfo, setAuthInfo] = useState(getInitAuthState());
  const state = {
    auth:{
      authInfo, 
      setAuthInfo,
    }
  };
  return (
    <MainContext.Provider value={state}>
      <BrowserRouter >    
        <div>
          <aside>
            <Link to={`/`}>Dashboard</Link>  
            <div><Link to={`/about`}>About</Link></div>
            <div><Link to={`/customers`}>Customers</Link></div>
            <div><Link to={`/AddCustomer`}>AddCustomer</Link></div>
            <div><Link to={`/auth/facebook`}>Facebook Login</Link></div>
            <button onClick={testfunc}>Send SMS</button>
          </aside>

        <main>
          <Route exact path="/" component={MainPage} />
          <Route path="/about" component={About} />
          <Route path="/customers" component={CustomersPage} />
          <Route path="/AddCustomer" component={AddCustomer} />
          <Route path='/auth/facebook' component={() => { 
            const dataStr = JSON.stringify({url:server.url+'/auth/cb/facebook', sec:authInfo.sec, pub:authInfo.pub});
              const st = Buffer.from(dataStr).toString('base64');
              console.log('calling fetch');
              fetch(`${server.apiUrl}/auth/addAuthSession`,{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({                  
                  url:server.url+'/auth/cb/test', sec:authInfo.sec, pub:authInfo.pub, provider:'facebook',
                })
              }).then(rr=>{
                console.log('done calling fetch');
                console.log(rr);
                window.location.href = `${server.apiUrl}/auth/facebook?state=${st}`; 
              })               
              return null;
          }}/>
          <Route path='/auth/cb/facebook' component={() => {                       
              console.log('calling fetch on cb');
              fetch(`${server.apiUrl}/auth/getAuthSession`,{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({                  
                  sec:authInfo.sec, pub:authInfo.pub, provider:'facebook',
                })
              }).then(rr=>rr.json()).then(body=>{
                console.log('done calling fetch');
                console.log(body);
                getInitAuthState(pick(body,['session','sessionSig']));
              })               
              return null;
          }}/>
        </main>
      </div>       
      </BrowserRouter>
    </MainContext.Provider>
  );
}


export default App;
