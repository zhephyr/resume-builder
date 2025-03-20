import ResumeForm from "./content/resumeForm";
import Skills from "./content/resumeForm/skills";
import BasicInfo from "./content/resumeForm/basicInfo";
import WorkHistory from "./content/resumeForm/workHistory";
import Navigation from "./content/navigation";
import ModalProvider from "./common/providers/modalProvider";

export default function Content({step}: {step: number}){
    const MAX_TAGS = 100;
    const FINAL_STEP = 3;

    return (
        <div className="pt-40">
            <ModalProvider>
                <div className="w-full justify-items-center">
                    <ResumeForm>
                        {step >= 1 && <BasicInfo /> }
                        {step >= 2 && <Skills maxTags={MAX_TAGS}/>}
                        {step >=3 && <WorkHistory />}
                        <Navigation finalStep={FINAL_STEP} />
                    </ResumeForm>
                </div>
                <div className="h-100" />
            </ModalProvider>
        </div>
    )
}