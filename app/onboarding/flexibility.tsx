import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserDetails } from "../lib/models/user";
import classses from "../utils/classes";
import Icon from "../components/icon";
import Button from "../components/button";

const options = [
    {
        name: "Stiff",
        description: "Struggles with most stretching and bending activities."
    },
    {
        name: "Limited",
        description: "Difficulty with stretching beyond basic movements."
    },
    {
        name: "Moderate",
        description: "Can do basic stretches and bends."
    },
    {
        name: "High",
        description: "Easily touch toes, twist, and bend."
    },
    {
        name: "Exceptional",
        description: "Can perform advanced yoga and stretches."
    }
]



const Flexibility = ({ details, changeDetails, changePage }: { details: UserDetails, changeDetails: Dispatch<SetStateAction<UserDetails>>, changePage: Dispatch<SetStateAction<number>> }) => {
    const [selected, changeSelected] = useState<number>(details?.flexibility ?? 1);

    useEffect(() => {
        changeSelected(details?.flexibility ?? 1);
    }, [details])

    return (
        <div className="flex flex-1 flex-col items-stretch">
            <div className="flex flex-1 justify-center flex-col items-stretch gap-[10px]">
                <h1 className="font-inter font-extrabold text-4xl mb-[40px]">Fitness Assessment</h1>
                <h2 className="font-inter font-bold text-2xl">How flexible are you?</h2>
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
                            <div className="flex text-green-700">
                                {Array.from(Array(i + 1).keys()).map((_, index) => (
                                    <Icon key={classses("flash", index.toString())} name="filled-flash" size={24} />
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
                        flexibility: selected as 1 | 2 | 3 | 4 | 5,
                    }));
                    changePage(prev => prev + 1);
                }}>Next</Button>
            </div>
        </div>


    )
}

export default Flexibility;