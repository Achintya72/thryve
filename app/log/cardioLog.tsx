import { FieldValues, useForm } from "react-hook-form";
import Input from "../components/input";
import { useContext, useState } from "react";
import classses from "../utils/classes";
import Icon from "../components/icon";
import Button from "../components/button";
import DataContext from "../lib/repository/store";
import { useRouter } from "next/navigation";

interface CardioForm extends FieldValues {
    minutes: number
}

const options = [
    {
        name: "Breezy",
        description: "Barely noticeable increase in breathing and heart rate.",
        met: 2.5
    },
    {
        name: "Light",
        description: "Noticeable increase in breathing, still able to talk comfortably.",
        met: 3.5
    },
    {
        name: "Moderate",
        description: "Increased breathing and heart rate, beginning to sweat.",
        met: 5
    },
    {
        name: "Vigorous",
        description: "Rapid breathing and heart rate, significant sweating.",
        met: 7
    },
    {
        name: "Maximal",
        description: "Maximum effort, very rapid breathing and heart rate.",
        met: 9
    }
]

type Day = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

const days: Day[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];


export default function CardioLog() {
    const { register, formState: { errors }, handleSubmit } = useForm<CardioForm>({
        mode: "all",
        reValidateMode: "onChange"
    });
    const router = useRouter();
    const [selected, changeSelected] = useState<number>(1);
    const { addCardio } = useContext(DataContext);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: CardioForm) => {
        setLoading(true);
        let day = new Date();
        let dayNum = day.getDay();
        await addCardio(+data.minutes, days[dayNum], options[selected - 1].met)
        setLoading(false);
        router.back();
    }

    return (
        <form onClick={handleSubmit(onSubmit)} className="flex flex-col items-stretch gap-[10px]">
            <Input<CardioForm>
                register={register}
                label="Duration (Min)"
                name="minutes"
                error={errors.minutes}
                type="number"
                min={0}
                max={180}
                options={{
                    required: { value: true, message: "Required" },
                    min: { value: 0, message: "Invalid Time" },
                    max: { value: 180, message: "Too much time" }
                }}
            />
            <p className="font-inter text-xs uppercase font-bold tracking-widest text-gray-400">Intensity</p>
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
            <Button type="submit">{loading ? "Loading..." : "Add"}</Button>
        </form>
    )
}