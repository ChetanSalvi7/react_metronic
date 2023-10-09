import {createSlice} from "@reduxjs/toolkit";

const initialGroupState = {
  group: null,
  groupsDropdown: null
};

export const GroupSlices = createSlice({
  name: "groups",
  initialState: initialGroupState,
  reducers: {
    group: (state, action) => {
      state.group = action.payload.group;
    },

    groupList: (state, action) => {
      state.groupsDropdown = action.payload.groups;
    }
  }
});