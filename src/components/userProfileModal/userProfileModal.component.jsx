import React, { useState } from 'react';
import './userProfileModal.styles.scss';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FormUpdateProfileModal from '../formUpdateProfileModal/formUpdateProfileModal.component';
import { selectUserFirstTimeLogIn} from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const UserProfileModal = (props) => {
  const {
    buttonLabel,
    className,
    modalState,
    firstTimer
  } = props;

  const [modal, setModal] = useState(modalState);

  const toggle = () => setModal(!modal);

  return (
    <div className='UserProfileModal'>
      <Button color='warning' onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{firstTimer ? 'Please Complete Your Profile!' : 'Update Profile'}</ModalHeader>
        <ModalBody>
          <FormUpdateProfileModal toggle={toggle}/>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  firstTimer: selectUserFirstTimeLogIn
})


export default connect(mapStateToProps )(UserProfileModal);