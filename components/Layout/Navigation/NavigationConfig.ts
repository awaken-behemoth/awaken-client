import NavigationPreset from "./NavigationPreset";


export default interface NavigationConfig {
    preset: NavigationPreset
}

export const defaultConfig = {
    preset: NavigationPreset.DEFAULT
}