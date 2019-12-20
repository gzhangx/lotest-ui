import React, {useState, useEffect} from 'react';
import { Redirect ,BrowserRouter, Route, withRouter } from 'react-router-dom'
import pick from 'lodash/pick';
import {MainContext, DEFAULT_STATE} from "./provider";
import cookie from 'react-cookies'
import {Button,ButtonToolbar, FormCheck, Form, FormGroup, Spinner, ListGroup} from 'react-bootstrap';
import {addAuthHdr} from './auth';
import server from '../config.json';


class AddCust extends React.Component{
    state = {
        name: '',
        email:'',
        showLoading: true,
    }
    
    save() {
        this.setState({showLoading:true});
        fetch(`${server.apiUrl}/saveCustomer`,{
            method: 'post',
            headers: addAuthHdr({'Content-Type':'application/json'}),
            body: JSON.stringify(pick(this.state,['name','email']))
        }).then(()=>{
            this.setState({showLoading:false});
        });
    }

    render(){
        return <div>
            {this.state.showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Saving...</span>
                </Spinner> }
            <FormGroup>
                Name: <input value={this.state.name} onChange={e=>{
                    this.setState({name: e.target.value});                
                    }}/>
                Email: <input value={this.state.email} onChange={e=>{
                    this.setState({email:e.target.value})
                }}/>
                <button onClick={()=>this.save()}>Save</button>
            </FormGroup>
        </div>;
    }
}

export default AddCust;