import { UserDetails } from "../models/user";

const calculateCalorieGoals: (user: UserDetails) => number = (user: UserDetails) => {
    let bmr = 88.362 + (6.0768) * (user?.weight ?? 0) + 12.189 * (user?.height ?? 0) - 5.677 * (user?.age ?? 0);
    return (0.55 * bmr);
}
type Plant = "Ground" | "Sapling" | "Plant" | "Small Tree" | "Large Tree" | "Forest";

const getTreeType: (user: UserDetails) => Plant = (user: UserDetails) => {
    let points = user?.points ?? 0;
    if(points < 7300) {
        return "Ground";
    } if(points < 14600) {
        return "Sapling";
    } if(points < 21900) {
        return "Plant"
    } if(points < 29200) {
        return "Small Tree"
    } if(points < 36500) {
        return "Large Tree"
    }
    return "Forest";
}

export  {calculateCalorieGoals, getTreeType};