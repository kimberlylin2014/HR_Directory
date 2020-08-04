import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  NavbarBrand
} from 'reactstrap';
import { selectCurrentCompany } from '../../redux/company/company.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutUserStart } from '../../redux/user/user.actions';

const Header = ({currentCompany, currentUser, signOutUserStart}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" >
        <div className='container'>
            <NavbarBrand>{currentCompany ? currentCompany.companyName : 'MyColleagues Inc.'}</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {currentUser ? <NavLink onClick={()=> signOutUserStart()}>Log Out</NavLink> : ''}
                    </NavItem>
                </Nav>
            </Collapse>
        </div>
      </Navbar>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
    currentCompany: selectCurrentCompany,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => {
    return {
        signOutUserStart: () => dispatch(signOutUserStart())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));