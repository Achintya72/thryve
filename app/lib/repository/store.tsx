"use client";

import { Auth, onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { redirect, usePathname, useRouter } from "next/navigation";
import { UserDetails } from "../models/user";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

interface StoreData {
    authUser?: User | null,
    user?: UserDetails | null,
    updateUser?: (user: UserDetails) => void,

}

let DataContext = React.createContext<StoreData>({});

let freePages = ["/", "/signIn", "/signUp"];

const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, changeAuthUser] = useState<User | null>(null);
    const [user, changeUser] = useState<UserDetails | null>(null);
    const router = useRouter();

    const pathName = usePathname();

    const updateUser = async (user: UserDetails) => {
        if(authUser) {
            let data = user as UserDetails;
            console.log(data);
            await setDoc(doc(db, "Users", authUser.uid), {
                ...data,
                age: +(data?.age ?? 0),
                weight: +(data?.weight ?? 0),
                completedOnboarding: true
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

    return (
        <DataContext.Provider value={{ authUser, user, updateUser }}>{children}</DataContext.Provider>
    )
}

export {
    DataContext as default,
    DataContextProvider
};