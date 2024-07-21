import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UserDetails } from "../lib/models/user";
import classses from "../utils/classes";
import Icon from "../components/icon";
import Button from "../components/button";

const options = [
    {
        name: "Breezy",
        description: "Barely noticeable increase in breathing and heart rate."
    },
    {
        name: "Light",
        description: "Noticeable increase in breathing, still able to talk comfortably."
    },
    {
        name: "Moderate",
        description: "Increased breathing and heart rate, beginning to sweat."
    },
    {
        name: "Vigorous",
        description: "Rapid breathing and heart rate, significant sweating."
    },
    {
        name: "Maximal",
        description: "Maximum effort, very rapid breathing and heart rate."
    }
]



const CardioAssessment = ({ details, changeDetails, changePage }: { details: UserDetails, changeDetails: Dispatch<SetStateAction<UserDetails>>, changePage: Dispatch<SetStateAction<number>> }) => {
    const [selected, changeSelected] = useState<number>(details?.cardioIntensity ?? 1);

    useEffect(() => {
        changeSelected(details?.cardioIntensity ?? 1);
    }, [details])

    return (
        <div className="flex flex-1 flex-col items-stretch">
            <div className="flex flex-1 justify-center flex-col items-stretch gap-[10px]">
                <h1 className="font-inter font-extrabold text-4xl mb-[40px]">Fitness Assessment</h1>
                <h2 className="font-inter font-bold text-2xl">How intense is your cardio?</h2>
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
                            <div className="flex text-orange-700">
                                {Array.from(Array(i + 1).keys()).map((_, index) => (
                                    <Icon key={classses("flame", index.toString())} name="filled-flame" size={24} />
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
                        cardioIntensity: selected as 1 | 2 | 3 | 4 | 5,
                    }));
                    changePage(prev => prev + 1);
                }}>Next</Button>
            </div>
        </div>


    )
}

export default CardioAssessment;