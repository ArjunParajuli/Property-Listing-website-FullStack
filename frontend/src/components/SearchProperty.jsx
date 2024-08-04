import React from "react";
import { useAppContext } from "../context/AppContext";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";

const SearchProperty = () => {
  const {
    isLoading,
    search,
    searchStatus,
    statusOptions,
    propertyTypeOptions,
    searchType,
    sort,
    sortOptions,
    searchChangeHandler,
    resetFilters
  } = useAppContext();

  const changeHandler = (e) => {
    if (isLoading) return; // currently making fetch call so avoid applying filter for now

    searchChangeHandler({ name: e.target.name, value: e.target.value });
  };


  const handleSubmit = () =>{
    resetFilters()
  }

  return (
    <form>
      {/* IMP: name must be same as the name of property we wanna change in the state as we're updating using [name]: value in our reducer */}
      <FormRow
        type="text"
        name="search"
        labelText="Search Location"
        value={search}
        changeHandler={changeHandler}
      />

      <FormRowSelect
        name="searchStatus"
        defaultValue={searchStatus}
        changeHandler={changeHandler}
        list={["all", ...statusOptions]}
      />


      {/* search by type */}
      <FormRowSelect
        name="searchType"
        defaultValue={searchType}
        changeHandler={changeHandler}
        list={["all", ...propertyTypeOptions]}
      />
      {/* sort */}
      <FormRowSelect
        name="sort"
        defaultValue={sort}
        changeHandler={changeHandler}
        list={sortOptions}
      />
      <button
        className="btn btn-block btn-danger"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        clear filters
      </button>
    </form>
  );
};

export default SearchProperty;
