interface UserDetails {
    name?: string,
    email?: string,
    id?: string,
    height?: number,
    weight?: number,
    age?: number,
    exerciseFreq?: 1 | 2 | 3,
    cardioIntensity?: 1 | 2 | 3 | 4 | 5,
    flexibility?: 1 | 2 | 3 | 4 | 5,
    strength?: 1 | 2 | 3 | 4 | 5
    completedOnboarding?: boolean,
    streak?: number,
    points?: number,
    dailyCalories?: number,
    weeklyActivity?: {
        sunday: number,
        monday: number,
        tuesday: number,
        wednesday: number,
        thursday: number,
        friday: number,
        saturday: number
    }
    events?: string[],
    friends?: string[],
}

const TIERS = []

export type {
    UserDetails
}