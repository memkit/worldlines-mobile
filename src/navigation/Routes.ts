
export type RoutesProps = "profile" | "onboarding" | "home" | "homestack"
export const routes: { [key in RoutesProps]: string } = {
    profile: "profile",
    onboarding: "onboarding",
    home: "home",
    homestack: "homestack"
}

export const screenStaticTitle: { [key in RoutesProps]: string } = {
    profile: "Profile",
    onboarding: "Onboarding",
    home: "WorldLines",
    homestack: "homestack"

}