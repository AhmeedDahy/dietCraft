import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useState, useMemo } from "react";
import Progress from "../../ui/Progress";
import useDiet from "./useDiet";
import useUser from "../auth/useUser";
import SpinnerMini from "../../ui/SpinnerMini";
import InputField from "../../ui/InputField";
import SelectField from "../../ui/SelectField";
import { useTarget } from "../../context/TargetContext";

export default function DietDataForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm();
  const { dietFn, isPending } = useDiet();
  const { user } = useUser();
  const { getNutritions } = useTarget();
  const [step, setStep] = useState(1);
  const email = useMemo(() => user?.email || "", [user]);
  const fullName = useMemo(
    () =>
      `${user?.user_metadata?.firstName || ""} ${user?.user_metadata?.lastName || ""}`.trim(),
    [user]
  );

  const fieldsByStep = {
    1: ["weight", "height", "bodyFat"],
    2: ["age", "gender"],
    3: ["activity", "plan"]
  };

  const handleNext = async () => {
    const isValid = await trigger(fieldsByStep[step]);
    if (isValid) setStep((prev) => prev + 1);
  };

  const handlePrevious = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {
    const rate = data?.plan?.split(" ");
    dietFn({
      addGuest: { ...data, email, fullName, rate: rate[1], plan: rate[0] },
      email
    });
    const nutrationsGuest = {
      ...data,
      height: Number(data.height),
      weight: Number(data.weight),
      bodyFat: Number(data.bodyFat),
      age: Number(data.age),
      rate: rate[1],
      plan: rate[0]
    };
    getNutritions(nutrationsGuest);
  };

  return (
    <section>
      <div className="max-w-[25rem] mx-auto max-sm:px-5">
        <div className="w-full bg-white rounded-lg shadow-lg">
          <Progress maxSteps={3} step={step} />
          <div className="flex flex-col justify-between h-full gap-4 px-8 py-8 max-md:px-4 max-md:py-6">
            <h1 className="text-2xl font-bold text-center text-gray-700">
              Set your important details
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              {step === 1 && (
                <>
                  <InputField
                    id="weight"
                    label="Weight (kg)"
                    type="number"
                    register={register}
                    validation={{
                      required: "Weight is required",
                      min: {
                        value: 60,
                        message: "Weight should be greater than 60"
                      },
                      max: {
                        value: 300,
                        message: "Weight should be less than 300"
                      }
                    }}
                    error={errors.weight}
                  />
                  <InputField
                    id="height"
                    label="Height (cm)"
                    type="number"
                    register={register}
                    validation={{
                      required: "Height is required",
                      min: {
                        value: 100,
                        message: "Height should be greater than 100"
                      },
                      max: {
                        value: 250,
                        message: "Height should be less than 250"
                      }
                    }}
                    error={errors.height}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <InputField
                    id="age"
                    label="Age"
                    type="number"
                    register={register}
                    validation={{
                      required: "Age is required",
                      min: {
                        value: 13,
                        message: "Age should be greater than 13"
                      },
                      max: {
                        value: 110,
                        message: "Age should be less than 110"
                      }
                    }}
                    error={errors.age}
                  />
                  <SelectField
                    id="gender"
                    label="Gender"
                    register={register}
                    validation={{ required: "Gender is required" }}
                    error={errors.gender}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" }
                    ]}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  <SelectField
                    id="activity"
                    label="Activity Level"
                    register={register}
                    validation={{ required: "Activity level is required" }}
                    error={errors.activity}
                    options={[
                      { value: "sedentary", label: "Little/no exercise" },
                      { value: "lightlyActive", label: "Light exercise" },
                      { value: "moderateActivity", label: "Moderate exercise" },
                      { value: "active", label: "Active" },
                      {
                        value: "veryActive",
                        label: "Very Active & Physical Job"
                      }
                    ]}
                  />
                  <SelectField
                    id="plan"
                    label="Plan"
                    register={register}
                    validation={{ required: "Plan is required" }}
                    error={errors.plan}
                    options={[
                      { value: "gain 0.5", label: "Weight gain" },
                      { value: "gain 1", label: "Extreme Weight gain" },
                      { value: "maintain 0", label: "Maintain Weight" },
                      { value: "loss 0.5", label: "Weight Loss" },
                      { value: "loss 1", label: "Extreme Weight loss" }
                    ]}
                  />
                </>
              )}
            </form>

            <div
              className={`flex items-center ${step === 1 ? "justify-end" : "justify-between"} w-full`}
            >
              {step > 1 && (
                <button
                  onClick={handlePrevious}
                  className="text-white bg-green-600 hover:bg-green-700 transition font-medium rounded-lg text-sm px-5 py-2.5 flex items-center gap-2 shadow-md"
                >
                  <GoArrowLeft size={18} /> Back
                </button>
              )}
              <button
                onClick={step === 3 ? handleSubmit(onSubmit) : handleNext}
                className="text-white bg-green-600 hover:bg-green-700 transition font-medium rounded-lg text-sm px-5 py-2.5 flex gap-2 items-center shadow-md"
              >
                {step === 3 ? isPending ? <SpinnerMini /> : "Submit" : "Next"}
                {step === 3 ? (
                  isPending ? (
                    ""
                  ) : (
                    <IoIosCheckmarkCircleOutline size={18} />
                  )
                ) : (
                  <GoArrowRight size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
