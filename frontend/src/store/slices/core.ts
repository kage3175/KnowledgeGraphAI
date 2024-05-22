import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "..";

export enum TabState {
  MAIN = 0, NEW = 1, SUMMARY = 2,
};

export enum DarkLightState {
  LIGHT = 0, DARK = 1
};

export enum PrevilegedState {
  PUBLIC = 0, PRIVATE = 1, ADMIN = 2
};

export interface CoreState {
  selectedTab: TabState; // Selected Tab Number.
  darkLight: DarkLightState; // Selected Mode(Dark, Light).
  windowSize: [number, number];
  privMode: PrevilegedState;
}
const initialState: CoreState = {
 selectedTab: TabState.MAIN,
 darkLight: DarkLightState.LIGHT,
 windowSize: [1500, 1500],
 privMode: PrevilegedState.PUBLIC,
};

export const coreSlice = createSlice(
  {
    name: "core",
    initialState,
    reducers: {
      setTab: (state: any, action: PayloadAction<{ selectedTab: TabState; }>) => {
        state.selectedTab = action.payload.selectedTab;
      },
      setDarkLight: (state: any, action: PayloadAction<{ darkLight: DarkLightState; }>) => {
        state.darkLight = action.payload.darkLight;
      },
      setWindowSize: (state: any, action: PayloadAction<{ width: number, height: number }>) => {
        state.windowSize = [action.payload.width, action.payload.height];
      },
      setPrivMode: (state: any, action: PayloadAction<{ privMode: PrevilegedState }>) => {
        state.privMode = action.payload.privMode;
      },
    },
  }
);

export const coreActions = coreSlice.actions;
// export const selectCore = (state: RootState) => state.core;
export default coreSlice.reducer;