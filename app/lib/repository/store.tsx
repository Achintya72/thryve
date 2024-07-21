"use client";

import { Auth, onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { redirect, usePathname, useRouter } from "next/navigation";
import { UserDetails } from "../models/user";
import { doc, onSnapshot, setDoc, collection, getDocs, QueryDocumentSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { ThryveEvent } from "../models/event";
import { calculateCalorieGoals } from "../services/fitness";

interface StoreData {
    authUser?: User | null,
    user?: UserDetails | null,
    completeOnboarding?: (user: UserDetails) => void,
    allEvents: ThryveEvent[];
    allUsers: UserDetails[];
    handleEvent: (uid: string) => void;
    addCardio: (time: number, day: Day, met: number) => void
}

let DataContext = React.createContext<StoreData>({allEvents: [], allUsers: [], addCardio: (time, day) => {},  handleEvent: (uid: string) => {}});
type Day = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

let freePages = ["/", "/signIn", "/signUp"];

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, changeAuthUser] = useState<User | null>(null);
    const [user, changeUser] = useState<UserDetails | null>(null);
    const [allEvents, changeAllEvents] = useState<ThryveEvent[]>([]);
    const [allUsers, changeAllUsers] = useState<UserDetails[]>([]);
    const router = useRouter();

    const pathName = usePathname();

    const addCardio = async (time: number, day: Day, met: number) => {
        if(authUser && user) {
            let calories = Math.round(met * 3.5 * (user?.weight ?? 0) * 0.454 * time / 200);
            let newUser = { ...user };
            if(newUser.weeklyActivity) {
                if(newUser.streak) {
                    if(newUser.weeklyActivity[day] == 0) {
                        newUser.streak += 1;
                    }   
                }
                newUser.weeklyActivity[day] += calories;
            }
            newUser.points = (newUser?.points ?? 0) + Math.round(calories * 100 / calculateCalorieGoals(user));
            newUser.dailyCalories = (newUser?.dailyCalories ?? 0) + calories;
            await setDoc(doc(db, "Users", authUser.uid), {
                ...newUser
            }, {merge: true})
        }
    }

    const completeOnboarding = async (user: UserDetails) => {
        if(authUser) {
            let data = user as UserDetails;
            console.log(data);
            await setDoc(doc(db, "Users", authUser.uid), {
                ...data,
                age: +(data?.age ?? 0),
                weight: +(data?.weight ?? 0),
                completedOnboarding: true,
                streak: 0,
                points: 0,
                dailyCalories: 0,
                weeklyActivity: {
                    sunday: 0,
                    monday: 0,
                    tuesday: 0,
                    wednesday: 0,
                    thursday: 0,
                    friday: 0,
                    saturday: 0
                },
                events: [],
                friends: [],
            }, { merge: true});
        }
    }

    useEffect(() => {
        return onAuthStateChanged(auth, (user: User | null) => {
            if (!user) {
                changeAuthUser(null);
            } else {
                changeAuthUser(user);

            }
        });
    }, []);

    useEffect(() => {
        const createUser = async (user: User) => {
            await setDoc(doc(db, "Users", user.uid), {
                id: user.uid,
                email: user.email,
                completedOnboarding: false
            }, { merge: true })
        }
        let unsub = () => { }
        if (authUser) {
            unsub = onSnapshot(doc(db, "Users", authUser.uid), (doc) => {
                changeUser(doc.data() as UserDetails);
                console.log(doc.data());
                if(doc.data() == undefined) {
                    createUser(authUser);
                }
            });

        } else {
            changeUser(null);
        }
        return unsub;
    }, [authUser]);

    useEffect(() => {
        console.log(authUser, pathName);
        if (freePages.includes(pathName)) {
            if(user?.completedOnboarding ?? false) {
                router.replace("/dashboard");
            } else if (authUser) {
                router.replace("/onboarding");
            }
        }
        if(pathName == "/onboarding" && (user?.completedOnboarding ?? false)) {
            router.replace("/dashboard");
        }
    }, [authUser, user]);

    useEffect(() => {
        let unsub = onSnapshot(collection(db, "Events"), (snapshot) => {
            let n = snapshot.docs.map((e: QueryDocumentSnapshot) => {
                let s = e.data()
                s["uid"] = e.id;
                console.log(s as ThryveEvent);
                return s as ThryveEvent;
            })

            changeAllEvents(n);
        })
        return unsub
    }, [])

    useEffect(() => {
        let unsub = onSnapshot(collection(db, "Users"), (snapshot) => {
            let n = snapshot.docs.map((e: QueryDocumentSnapshot) => {
                let s = e.data()
                s["uid"] = e.id;
                console.log(s as UserDetails);
                return s as UserDetails;
            })

            changeAllUsers(n);
        })
        return unsub
    }, [])

    const handleEvent = (uid: string) => {
        if(authUser && user?.events) {
            updateDoc(doc(db, "Users", authUser.uid), {events: user.events.includes(uid) ? arrayRemove(uid) : arrayUnion(uid)})
        }
    }

    return (
        <DataContext.Provider value={{ addCardio, authUser, user, completeOnboarding, allEvents, allUsers, handleEvent }}>{children}</DataContext.Provider>
    )
}

export {
    DataContext as default,
    DataContextProvider
};