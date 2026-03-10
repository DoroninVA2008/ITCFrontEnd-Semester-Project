import { selectors } from "./selectors"
import { name, reducer } from "./slice"

export const MainContent = {
    reducer: { [name]: reducer },
    selectors,
}