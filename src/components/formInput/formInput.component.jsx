import React from 'react';
import './formInput.styles.scss';
import { FormGroup, Label, Input } from 'reactstrap';

const FormInput = ({label, name, type, value, onChange, validColor, invalidColor}) => {
    return(
        <div className='FormInput'>
            <FormGroup>
                <Label for={name}>{label}</Label>
                <Input type={type} name={name} id={name} onChange={onChange} value={value} className={`${validColor} ${invalidColor}`}/>
            </FormGroup>
        </div>
       
    )
}

export default FormInput;