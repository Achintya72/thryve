import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { UserDetails } from "../lib/models/user";
import classses from "../utils/classes";
import Icon from "../components/icon";
import Button from "../components/button";
import DataContext from "../lib/repository/store";

const options = [
    {
        name: "Weak",
        description: "Can lift less than 10% of body weight."
    },
    {
        name: "Limited",
        description: "Can lift 10-24% of body weight."
    },
    {
        name: "Moderate",
        description: "Can lift 25-49% of body weight."
    },
    {
        name: "High",
        description: "Can lift 50-74% of body weight."
    },
    {
        name: "Exceptional",
        description: "Can lift 75% or more of body weight.."
    }
]



const Strength = ({ details, changeDetails, changePage }: { details: UserDetails, changeDetails: Dispatch<SetStateAction<UserDetails>>, changePage: Dispatch<SetStateAction<number>> }) => {
    const [selected, changeSelected] = useState<number>(details?.strength ?? 1);
    const [loading, setLoading] = useState(false);
    const { updateUser } = useContext(DataContext);

    useEffect(() => {
        changeSelected(details?.strength ?? 1);
    }, [details])

    const updateDB = async () => {
        if (updateUser) {
            setLoading(true);
            await updateUser(details);
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-1 flex-col items-stretch">
            <div className="flex flex-1 justify-center flex-col items-stretch gap-[10px]">
                <h1 className="font-inter font-extrabold text-4xl mb-[40px]">Fitness Assessment</h1>
                <h2 className="font-inter font-bold text-2xl">How strong are you?</h2>
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
                            <div className="flex text-black">
                                {Array.from(Array(i + 1).keys()).map((_, index) => (
                                    <Icon key={classses("barbell", index.toString())} name="filled-barbell" size={24} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                ))}
            </div>
            <div className="flex gap-[10px] items-stretch">
                <Button className="flex-1" variant="secondary" onClick={() => changePage(page => page - 1)}>Back</Button>
                <Button className="flex-1" onClick={() => {
                    changeDetails(prev => ({
                        ...prev,
                        strength: selected as 1 | 2 | 3 | 4 | 5,
                    }));
                    updateDB();
                }}>{loading ? "Loading..." : "Save"}</Button>
            </div>
        </div>


    )
}

export default Strength;