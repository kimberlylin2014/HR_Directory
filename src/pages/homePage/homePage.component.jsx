import React from 'react';
import './homePage.styles.scss';
import UserProfile from '../../components/userProfile/userProfile.component';
import {selectCurrentCompany} from '../../redux/company/company.selectors';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

const HomePage = ({currentCompany}) => {
    console.log('homepage')
    const companyColor = currentCompany  ? currentCompany.companyColor : ''
    return(
        <div className='HomePage' style={{backgroundColor: companyColor }}>
            <UserProfile />
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentCompany: selectCurrentCompany
})
export default connect(mapStateToProps)(HomePage);