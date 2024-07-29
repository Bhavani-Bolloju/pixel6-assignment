// import React from "react";
import UserList from "./components/UserList";
import { useAppSelector, useAppDispatch } from "./redux-store/hooks";
import { filterCountry, filterGender } from "./redux-store/usersSlice";

function App() {
  const { countries, gender, countryName, genderType } = useAppSelector(
    (state) => state.users
  );

  const dispatch = useAppDispatch();

  const handleFilter = function (e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "country") {
      dispatch(filterCountry(value));
    }
    if (name === "gender") {
      dispatch(filterGender(value));
    }
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
          <div className="current-filter">
            {countryName !== "" && <span>{countryName}</span>}
            {genderType !== "" && <span>{genderType}</span>}
          </div>
        </div>
        <form>
          <div>
            <select name="country" onChange={handleFilter}>
              <option value="">country</option>
              {countries.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select name="gender" onChange={handleFilter}>
              <option value="">gender</option>
              {gender.map((country, i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
      <UserList />
    </div>
  );
}

export default App;
