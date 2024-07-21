import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserDetails } from "../lib/models/user";
import classses from "../utils/classes";
import Icon from "../components/icon";
import Button from "../components/button";

const options = [
    {
        name: "Rarely",
        description: "Less than once a week"
    },
    {
        name: "Often",
        description: "3-4 times a week",
    },
    {
        name: "Regularly",
        description: "Almost every day"
    }
]



const FrequencyAssessment = ({ details, changeDetails, changePage }: { details: UserDetails, changeDetails: Dispatch<SetStateAction<UserDetails>>, changePage: Dispatch<SetStateAction<number>> }) => {
    const [selected, changeSelected] = useState<number>(details.exerciseFreq ?? 1);

    useEffect(() => {
        changeSelected(details?.exerciseFreq ?? 1);
    }, [details])

    return (
        <div className="flex flex-1 flex-col items-stretch">
            <div className="flex flex-1 justify-center flex-col items-stretch gap-[10px]">
                <h1 className="font-inter font-extrabold text-4xl mb-[40px]">Fitness Assessment</h1>
                <h2 className="font-inter font-bold text-2xl">How often do you exercise?</h2>
                {options.map((option, i) => (
                    <div
                        key={i}
                        onClick={() => changeSelected(i + 1)}
                        className={
                            classses(
                                "p-[20px] flex flex-col items-stretch gap-[10px] rounded-[8px]",
                                "border border-blue-100",
                                i + 1 == selected ? "!border-blue-700" : "")}>
                        <div className="flex justify-between">
                            <h3 className="text-xl font-bold font-inter">{option.name}</h3>
                            <div className="flex text-blue-700">
                                {Array.from(Array(i + 1).keys()).map((_, index) => (
                                    <Icon key={classses("calendar", index.toString())} name="filled-calendar" size={24} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                ))}
            </div>
            <div className="flex gap-[10px] items-stretch">
                <Button className="flex-1" variant="secondary" onClick={() => changePage(prev => prev - 1)}>Back</Button>
                <Button className="flex-1" onClick={() => {
                    changeDetails(prev => ({
                        ...prev,
                        exerciseFreq: selected as 1 | 2 | 3 ,
                    }));
                    changePage(prev => prev + 1);
                }}>Next</Button>
            </div>
        </div>


    )
}

export default FrequencyAssessment;