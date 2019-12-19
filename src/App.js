import React from 'react';
import logo from './logo.svg';
import './App.css';
import server from './config.json';
import MainPage from './components/MainPage';
import all from 'superagent';

function testfunc() {
  fetch(server.url+'/sendSMS', {
    method: 'post',
    headers: {'Content-Type':'application/json', 'Authorization':'Basic Z3poYW5nOnRlc3Q='},
    body: JSON.stringify({
      "message":"a message from gang 1 with save",
      "from":"+12162848800",
      "to":"+14043989999"
    })
   });
}
function App() {
  const url = server.url;
  return (
    <div className="App">
      <header className="App-header">
        <MainPage/>
        {server.url+"/auth/facebook"} --test
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={server.url+"/auth/facebook"}          
          rel="noopener noreferrer"
        >
          Facebook Login =>{url}
        </a>
        <button onClick={testfunc}>Send text</button>
      </header>      
    </div>
  );
}

export default App;
