import React from 'react'
import { MDBContainer, MDBFooter, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

/**
 * Footer is a component to enhance reusbality, there is no special functionality in this component
 * A little note fore beginners, target="_blank" in <a></a> component is used to open the link in a new tab
 */

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