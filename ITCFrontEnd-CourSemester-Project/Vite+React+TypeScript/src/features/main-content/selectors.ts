import { createSelector } from "@reduxjs/toolkit";
import { name, TitleHState } from "./slice";

interface RootState {
    [name]: TitleHState
}

const root = (store: RootState) => store["main-content"];
    const selectH1 = createSelector([root], (rootData) => rootData.title1);
        const selectH2 = createSelector([root], (rootData) => rootData.title2);
            const selectH3 = createSelector([root], (rootData) => rootData.title3);

export const selectors = {
    selectH1,
    selectH2,
    selectH3,
}