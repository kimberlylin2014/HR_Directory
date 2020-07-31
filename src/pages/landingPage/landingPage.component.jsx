import React from 'react';
import './landingPage.styles.scss';
import FormCompanySearchContainer from '../../components/formCompanySearch/formCompanySearch.container';

const LandingPage = () => {
    return(
        <div className='LandingPage'>
            <FormCompanySearchContainer />
        </div>
    )
}

export default LandingPage;