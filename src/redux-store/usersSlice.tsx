import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  countries: string[];
  gender: string[];
  genderType: string;
  countryName: string;
}

const initialState: StateType = {
  countries: [],
  gender: [],
  genderType: "",
  countryName: ""
};
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    countryNames: (state, action) => {
      const countries = [...state.countries];
      // console.log(action.payload, "payload");
      // console.log(countries, "state");
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
    }
  }
});

export const { countryNames, genderIdentities, filterCountry, filterGender } =
  userSlice.actions;

export default userSlice.reducer;
