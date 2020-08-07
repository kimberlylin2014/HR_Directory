import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand
} from 'reactstrap';
import { selectCurrentCompany } from '../../redux/company/company.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutUserStart } from '../../redux/user/user.actions';
import { getCompanyEmployeeStart } from '../../redux/company/company.actions'

const Header = ({currentCompany, currentUser, signOutUserStart, getCompanyEmployeeStart, history}) => {
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
                        {currentUser ? <NavLink onClick={
                          ()=> {
                            getCompanyEmployeeStart(currentCompany)
                            history.push('/employees')
                          }   
                        }>Employees</NavLink> : ''}
                    </NavItem>
                    <NavItem>
                        {currentUser ? <NavLink onClick={signOutUserStart}>Log Out</NavLink> : ''}
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
        signOutUserStart: () => dispatch(signOutUserStart()),
        getCompanyEmployeeStart: (currentCompany) => dispatch(getCompanyEmployeeStart(currentCompany))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));