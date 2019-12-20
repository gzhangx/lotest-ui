import React, {useState, useEffect} from 'react';
import { Redirect ,BrowserRouter, Route, withRouter } from 'react-router-dom'
import {MainContext, DEFAULT_STATE} from "./provider";
import cookie from 'react-cookies'
import {Button,ButtonToolbar, FormCheck, Form, FormGroup, Spinner, ListGroup} from 'react-bootstrap';
import {addAuthHdr} from './auth';
import server from '../config.json';


function AddCust(props) {
    return <div></div>;
    const [name, setName] = useState([]);
    const [showLoading, setShowLoading] = useState(true);

    return (
        <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Saving...</span>
          </Spinner> }
          <FormGroup>
            <FormGroup.Item>
                
            </FormGroup.Item>
          </FormGroup>
        </div>
    );
}

export default AddCust;