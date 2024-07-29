// import React from "react";
import { useState } from "react";
import UserList from "./components/UserList";
import { useAppSelector, useAppDispatch } from "./redux-store/hooks";
import {
  filterCountry,
  filterGender,
  clearFilter
} from "./redux-store/usersSlice";
import Select from "react-dropdown-select";

interface ValueProp {
  value: number;
  label: string;
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState<ValueProp[]>([]);
  const [selectedGender, setSelectedGender] = useState<ValueProp[]>([]);

  const { countries, gender, countryName, genderType } = useAppSelector(
    (state) => state.users
  );

  const dispatch = useAppDispatch();

  const countriesOptions = countries.map((country, i) => ({
    value: i,
    label: country
  }));
  const genderOptions = gender.map((gender, i) => ({
    value: i,
    label: gender
  }));

  const handleClear = function () {
    //clear filtered catergories
    setSelectedCountry([]);
    setSelectedGender([]);
    dispatch(clearFilter());
  };

  return (
    <div>
      <div className="users_filter">
        <h1>Employees</h1>
        <div className="filter-list">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
          <div className="current-filters">
            {countryName.length > 0 && <span>{countryName}</span>}
            {genderType.length > 0 && <span>{genderType}</span>}
          </div>
          {(genderType.length > 0 || countryName.length > 0) && (
            <button onClick={handleClear}>clear all</button>
          )}
        </div>
        <form>
          <div>
            {countries.length > 0 && (
              <Select
                className="select-filter"
                options={countriesOptions}
                placeholder="Country"
                values={selectedCountry}
                onChange={(value) => {
                  setSelectedCountry(value);
                  if (value.length > 0) {
                    dispatch(filterCountry(value[0].label));
                  }
                }}
              />
            )}
          </div>
          <div>
            {gender.length > 0 && (
              <Select
                className="w-fit"
                options={genderOptions}
                placeholder="Gender"
                values={selectedGender}
                onChange={(value) => {
                  setSelectedGender(value);
                  if (value.length > 0) {
                    dispatch(filterGender(value[0].label));
                  }
                }}
              />
            )}
          </div>
        </form>
      </div>
      <UserList />
    </div>
  );
}

export default App;
