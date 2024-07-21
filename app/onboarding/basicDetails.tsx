import Input from "../components/input";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/button";
import { UserDetails } from "../lib/models/user";

interface BasicDetailsData extends FieldValues {
    name: string,
    feet: number,
    inches: number,
    age: number,
    weight: number
}

const BasicDetails = ({ details, changeDetails, changePage }: { details: UserDetails, changeDetails: Dispatch<SetStateAction<UserDetails>>, changePage: Dispatch<SetStateAction<number>> }) => {
    const { register, formState: { errors }, handleSubmit } = useForm<BasicDetailsData>({
        mode: "all",
        reValidateMode: "onBlur",
        defaultValues: {
            name: details.name ?? "",
            age: details.age ?? 0,
            feet: Math.floor((details.height ?? 0) / 12),
            inches: (details.height ?? 0 ) % 12,
            weight: details.weight
        }
    });

    const onSubmit = (data: BasicDetailsData) => {
        changeDetails(prev => ({
            ...prev,
            name: data.name,
            age: (data.age as number),
            weight: (data.weight as number),
            height: (parseInt(data.feet.toString()) as number) * 12 + (parseInt(data.inches.toString()) as number)
        }));
        changePage(prev => prev + 1);
    } 

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 items-stretch gap-[10px] justify-center">
            <div className="flex flex-col flex-1 items-stretch gap-[10px] justify-center">
                <h1 className="font-inter font-extrabold text-4xl ">About You</h1>
                <Input<BasicDetailsData>
                    register={register}
                    label="name"
                    error={errors.name}
                    options={{
                        required: { value: true, message: "Required" }
                    }}
                    name="name"
                />
                <div className="flex gap-[10px]">
                    <Input<BasicDetailsData>
                        register={register}
                        label="height (ft)"
                        error={errors.feet}
                        options={{
                            required: { value: true, message: "Required" },
                        }}
                        min={0}
                        max={10}
                        name="feet"
                        grow
                        type="number"
                    />
                    <Input<BasicDetailsData>
                        register={register}
                        label="in."
                        error={errors.inches}
                        options={{
                            required: { value: true, message: "Required" }
                        }}
                        name="inches"
                        grow
                        type="number"
                        min={0}
                        max={12}
                    />
                </div>
                <div className="flex gap-[10px]">
                    <Input<BasicDetailsData>
                        register={register}
                        label="weight (lbs)"
                        error={errors.weight}
                        options={{
                            required: { value: true, message: "Required" }
                        }}
                        name="weight"
                        type="number"
                    />
                    <Input<BasicDetailsData>
                        register={register}
                        label="Age"
                        error={errors.age}
                        options={{
                            required: { value: true, message: "Required" }
                        }}
                        name="age"
                        type="number"
                        min={1}
                        max={120}
                    />
                </div>
            </div>
            <Button type="submit">Next</Button>
        </form>
    )
}


export default BasicDetails;