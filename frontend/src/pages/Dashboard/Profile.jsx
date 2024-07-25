import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import FormRow from '../../components/FormRow';
import Wrapper from '../../wrappers/profileForm';
import Alert from '../../components/Alert';
import { EMPTY_FIELDS } from '../../context/action';

const Profile = () => {
  const { user, showAlert, updateUser, displayAlert, isLoading} = useAppContext();

  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    location: user?.location,
    lastName: user?.lastName
  })

  const changeHandler = (e) => {
    setUserData((prev)=>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
    console.log(userData)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!userData.name || !userData.email || !userData.lastName || !userData.location) {
      displayAlert(EMPTY_FIELDS)
      return
    }
    updateUser(userData)
  }

  return (
    <Wrapper>
      
    <form className='form' onSubmit={submitHandler} >
    <h3>My Profile</h3>
        {showAlert && <Alert />}
    <div className='form-center'>
      <FormRow
      type="text"
      name="name"
      defaultValue={userData.name}
      changeHandler={changeHandler}
      />

    <FormRow
      type="email"
      name="email"
      defaultValue={userData.email}
      changeHandler={changeHandler}
      />

    <FormRow
      type="text"
      name="lastName"
      defaultValue={userData.lastName}
      changeHandler={changeHandler}
      />

    <FormRow
      type="text"
      name="location"
      defaultValue={userData.location}
      changeHandler={changeHandler}
      />

      <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
      </button>
    </div>
    </form>
    </Wrapper>
  )
}

export default Profile