import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  countries: string[];
  gender: string[];
  genderType: string;
  countryName: string;
  IDSort: string;
  ageSort: string;
}

const initialState: StateType = {
  countries: [],
  gender: [],
  genderType: "",
  countryName: "",
  IDSort: "asc",
  ageSort: ""
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    countryNames: (state, action) => {
      const countries = [...state.countries];
      if (countries.length <= 0) {
        state.countries = action.payload;
      } else {
        const value = [...new Set([...countries, ...action.payload])];
        state.countries = value;
      }
    },
    genderIdentities: (state, action) => {
      const gender = [...state.gender];

      if (gender.length <= 0) {
        state.gender = action.payload;
      } else {
        const value = [...new Set([...gender, ...action.payload])];
        state.gender = value;
      }
    },

    filterCountry: (state, action) => {
      state.countryName = action.payload;
    },
    filterGender: (state, action) => {
      state.genderType = action.payload;
    },
    sortFeilds: (state, action) => {
      // state.IDSort = action.payload;
      console.log(action.payload);
      if (action.payload.title === "id") {
        state.IDSort = action.payload.sort;
        state.ageSort = "";
      }

      if (action.payload.title === "age") {
        state.ageSort = action.payload.sort;
        state.IDSort = "";
      }
    }
  }
});

export const {
  countryNames,
  genderIdentities,
  filterCountry,
  filterGender,
  sortFeilds
} = userSlice.actions;

export default userSlice.reducer;
