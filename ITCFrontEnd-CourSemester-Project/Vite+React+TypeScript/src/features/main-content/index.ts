import { selectors } from "./selectors"
import { name, reducer } from "./slice"

export const MainContent = {
    reducer: { [name]: reducer },
    selectors: {
        selectH1: selectors.selectH1,
        selectH2: selectors.selectH2,
        selectH3: selectors.selectH3
    }
}