import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import FormRow from "../../components/FormRow";
import Wrapper from "../../wrappers/profileForm";
import Alert from "../../components/Alert";
import { EMPTY_FIELDS } from "../../context/action";

const Profile = () => {
  const { user, showAlert, updateUser, displayAlert, isLoading } =
    useAppContext();

  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    location: user?.location,
    lastName: user?.lastName,
    avatar: null,  // Add avatar to the state
  });

  // const changeHandler = (e) => {
  //   setUserData((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  //   console.log(userData);
  // };

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // Handle file input
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !userData.name ||
      !userData.email ||
      !userData.lastName ||
      !userData.location
    ) {
      displayAlert(EMPTY_FIELDS);
      return;
    }

    // Prepare form data to include the image file
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    updateUser(formData);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler} encType='multipart/form-data'>
        <h3>My Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          
          {/* image */}
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
              onChange={changeHandler}
            />
          </div>

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

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
