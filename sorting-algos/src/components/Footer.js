import React from 'react'
import { useGlobalContext } from '../context'
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const Footer = () => {
    return (
        <div className='stick-bottom'>
        <MDBFooter color="teal accent-4" className="font-small mt-3">
          <div className="footer-copyright text-center py-2">
            <MDBContainer fluid>
            <MDBIcon far icon="copyright" /> {new Date().getFullYear()} Copyright: <a href="https://github.com/furs1da" target="_blank" rel="noreferrer noopener"> Dmytrii Furs </a>
            </MDBContainer>
          </div>
        </MDBFooter>
        </div>
      );
    }

export default Footer