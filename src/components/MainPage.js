import React, {useState} from 'react';
import { Redirect ,BrowserRouter, Route } from 'react-router-dom'
import {MainContext, DEFAULT_STATE} from "./provider";
import cookie from 'react-cookies'
import {Button,ButtonToolbar, FormCheck, Form, FormGroup} from 'react-bootstrap';

import server from '../config.json';

class MainPage extends React.Component {
    
    state = {
        redirect: false,
        loggedIn: false,
        sess: cookie.load('egteam:sess'),
      }

      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }  
      
      renderRedirect = () => {
        if (this.state.redirect) {
            window.location.href = server.url+'/auth/facebook'; 
            return <Route path='/privacy-policy' component={() => { 
               // window.location.href = server.url+'/auth/facebook'; 
                return null;
           }}/>
        }
      }


    render() {
      cookie.save('useriddd','testttt');
      //const [isAuthenticated, userHasAuthenticated] = useState(false);
        return (
            <BrowserRouter>
            <MainContext.Provider value={{state: this.state}}>   
            {this.state.sess || 'cookie'}                             
                    <Form>
                        <Form.Group>      
                          <a href={server.url+'/auth/facebook'}>{server.url+'/auth/facebook'} testtest</a>                      
                            {this.renderRedirect()}
                            <button onClick={this.setRedirect}>Redirect1</button>
                        </Form.Group>
                    </Form>

            </MainContext.Provider>
            </BrowserRouter>
        );
    }
}

export default MainPage;