import {Timestamp} from "firebase/firestore"

interface ThryveEvent {
    duration: number;
    location: string;
    description: string;
    name: string;
    time: Timestamp;
    image: string;
    uid: string;
}

export type {
    ThryveEvent
}