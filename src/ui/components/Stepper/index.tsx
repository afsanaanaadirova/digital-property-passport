import { cn } from "@/app/utils/cn";
import type { StepperType } from "./stepper.type"
import CheckSVG from "@svg/check.svg?react";
import { Fragment } from "react";

const Stepper = ({ data, activeStep }: StepperType) => {
  const done = (index: number) =>
    data.findIndex((step) => activeStep === step.id) > index ||
    activeStep > data.length;

  return (
    <div className="p-4 border border-gray-200 rounded-2xl">
      {data.map((step, index) => (
        <Fragment key={step.id}>
          <div className="p-2 flex items-center gap-x-4">
            <div
              className={cn(
                "w-9 h-9 flex justify-center items-center border border-gray-200 rounded-full",
                activeStep === step.id && "border-blue-600",
                done(index) && "border-blue-600 bg-blue-600"
              )}
            >
              {done(index) ? (
                <CheckSVG className="text-white" />
              ) : (
                <p
                  className={cn(
                    "text-gray-500 text-15px500",
                    !(activeStep === step.id || done(index)) &&
                      "text-15px600 text-gray-800"
                  )}
                >
                  {index + 1}
                </p>
              )}
            </div>
            <p
              className={cn(
                "text-gray-500 text-15px500",
                !(activeStep === step.id || done(index)) &&
                  "text-15px600 text-gray-800"
              )}
            >
              {step.name}
            </p>
          </div>
          {data.length - 1 !== index && (
            <div
              className={cn(
                "relative left-6 h-6 border-l border-dashed border-gray-200",
                done(index) &&
                  "border-solid border-l-2 border-blue-600 after:absolute after:-left-1 after:bottom-0 after:w-1.5 after:h-1.5 after:rounded-full after:bg-blue-600"
              )}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Stepper;
