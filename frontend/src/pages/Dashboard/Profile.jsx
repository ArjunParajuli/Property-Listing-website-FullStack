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
    name: user?.name || "",  // Ensure empty string if user data is undefined
    email: user?.email || "",
    location: user?.location || "",
    lastName: user?.lastName || "",
    avatar: null,
  });

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
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

    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    updateUser(formData);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={submitHandler} encType="multipart/form-data">
        <h3>My Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          
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
            value={userData.name}  // Ensure value is passed from state
            changeHandler={changeHandler}
          />

          <FormRow
            type="email"
            name="email"
            value={userData.email}
            changeHandler={changeHandler}
          />

          <FormRow
            type="text"
            name="lastName"
            value={userData.lastName}
            changeHandler={changeHandler}
          />

          <FormRow
            type="text"
            name="location"
            value={userData.location}
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
