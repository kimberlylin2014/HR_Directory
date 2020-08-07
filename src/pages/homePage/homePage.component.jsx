import React from 'react';
import './homePage.styles.scss';
import UserProfile from '../../components/userProfile/userProfile.component';




const HomePage = () => {
    console.log('homepage')
    return(
        <div className='HomePage'>
            <UserProfile />
        </div>
    )
}


export default HomePage;