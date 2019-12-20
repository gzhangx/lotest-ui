import React, {useState, useEffect} from 'react';
import { Redirect ,BrowserRouter, Route, withRouter } from 'react-router-dom'
import {MainContext, DEFAULT_STATE} from "./provider";
import cookie from 'react-cookies'
import {Button,ButtonToolbar, FormCheck, Form, FormGroup, Spinner, ListGroup} from 'react-bootstrap';
import {addAuthHdr} from './auth';
import server from '../config.json';


function List(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const showDetail = (id) => {
        props.history.push({
          pathname: '/show/' + id
        });
      }
  
      
    useEffect(() => {
        const fetchData = async () => {
          fetch(server.apiUrl+'/loadCustomer?limit=10&skip=0',{
              headers: addAuthHdr({}),
          }).then(res=>res.json()).then(res=>{
            setData(res);
            setShowLoading(false);
          })          
        };
      
        fetchData();
      }, []);
    return (
        <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.prod_name}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
    )
}

export default withRouter(List);