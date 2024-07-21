"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/input";
import Button from "../components/button";
import { UserDetails } from "../lib/models/user";
import BasicDetails from "./basicDetails";
import FrequencyAssessment from "./frequency";
import CardioAssessment from "./cardioIntensity";
import Flexibility from "./flexibility";
import Strength from "./strength";

const Onboarding = () => {
    const [page, changePage] = useState<number>(0);
    const [userDetails, changeDetails] = useState<UserDetails>({});

    const pages = [
        <BasicDetails details={userDetails} changeDetails={changeDetails} changePage={changePage} />,
        <FrequencyAssessment details={userDetails} changeDetails={changeDetails} changePage={changePage} />,
        <CardioAssessment details={userDetails} changeDetails={changeDetails} changePage={changePage} />,   
        <Flexibility details={userDetails} changeDetails={changeDetails} changePage={changePage} />,
        <Strength details={userDetails} changeDetails={changeDetails} changePage={changePage} />
        
    ]

    return (
        <main className="flex max-w-[400px] mx-auto min-h-screen flex-col items-stretch p-[20px]">
            {pages[page]}
        </main>
    )
}



export default Onboarding;