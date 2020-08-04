import React from 'react';
import './formCompanySearch.styles.scss';
import { Form , Button} from 'reactstrap';
import FormInput from '../formInput/formInput.component';
import  { connect } from 'react-redux';
import { getCompanyDataStart } from '../../redux/company/company.actions';
import FormError from '../formError/formError.component';
import { createStructuredSelector } from 'reselect';
import { selectCompanyError, selectCurrentCompany } from '../../redux/company/company.selectors';
import { withRouter } from 'react-router-dom';

class FormCompanySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: ''
        }
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    
    handleOnChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const {getCompanyDataStart, errorMessage, currentCompany, history} = this.props;
        const searchButton = <Button onClick={() => getCompanyDataStart(this.state.companyName)}>Search</Button>;
        const nextButton = <Button color="success" onClick={() => history.push('/signIn')}>Next</Button>
        return(
            <div className='FormCompanySearch'>
                <Form>
                    <FormInput 
                        label='Company Name'
                        name='companyName'
                        type='text'
                        value={currentCompany ? currentCompany.companyName : this.state.companyName}
                        onChange={this.handleOnChange}
                        validColor={currentCompany ? 'valid' : ''}
                        invalidColor={errorMessage ? 'invalid' : ''}
                    />
                    {errorMessage ?  <FormError message={errorMessage}/> : ''}
                    {currentCompany ? nextButton : searchButton}
                   
                </Form>
            </div>
        )
    }
}

const mapDisptachToProps = (dispatch) => {
    return {
        getCompanyDataStart: (companyName) => dispatch(getCompanyDataStart(companyName))
    }
}

const mapStateToProps = createStructuredSelector({
    errorMessage: selectCompanyError,
    currentCompany: selectCurrentCompany
});

export default withRouter(connect(mapStateToProps, mapDisptachToProps)(FormCompanySearch));