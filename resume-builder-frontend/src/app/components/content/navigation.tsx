import { StepContext } from "@/app/page";
import { useContext } from "react";

export default function Navigation({finalStep}: {finalStep: number}) {
    const {step, handleStepChange} = useContext(StepContext);
    const nextStep = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        handleStepChange(step + 1)
    }

    return (
        // TODO: fade in on mount
        <div className="fixed bottom-0 left-1/4 flex w-6/12 justify-end z-10 border-t-2 border-accent bg-background p-4">
            {step < finalStep 
                ? <button className="bg-foreground px-4 py-2 rounded-4xl text-text font-bold" onClick={nextStep}>Next</button> 
                : <input className="bg-primary px-4 py-2 rounded-4xl text-background font-bold" value="Submit" type="submit" />}
        </div>
    )
}