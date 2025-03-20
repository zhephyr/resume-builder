import { Children, isValidElement, ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FadeInSlideUp from "../common/animation/FadeInSlideUp";
import { ResumeData } from "@/interfaces/resumeData";
import ContentBreak from "../common/contentBreak";
import { useModal } from "../common/providers/modalProvider";
import DisplayModal from "./DisplayModal";

export default function ResumeForm({children}: {children: ReactNode}) {
    const {isOpen, openModal, closeModal} = useModal();
    const [resumeText, setResumeText] = useState('');

    const methods = useForm<ResumeData>({defaultValues:{
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        skills: [],
        workHistory: [{
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            responsibilities: ''
        }],
    }});

    const onSubmit = async () => {
        console.log(methods.getValues());
        try {
            const response = await fetch('http://127.0.0.1:8000/generate-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(methods.getValues())
            });
            const data = await response.json();

            // Extracts only the resume text from the response; probably not the best way to do this; 
            // no idea if it's consistent; should probably update the prompt to return only the resume text
            const resumeText = data.resume_text.match(/---([\s\S]*)---/).join('');
            setResumeText(resumeText);
            openModal();
        } catch (error) {
            console.error('Error:', error.message)
        };
    }

    return(
        <FormProvider {...methods}>
            <form className="w-6/12 justify-items-center" onSubmit={methods.handleSubmit(onSubmit)}>
                {Children.map(children, (child, index) => 
                    isValidElement(child) ? (<FadeInSlideUp key={index}>
                        {index > 0 && index < (Children.count(children) - 1) ? <ContentBreak /> : ''}
                        {child}
                    </FadeInSlideUp>) : child
                )}
            </form>
            {isOpen && <DisplayModal content={resumeText} onClose={closeModal} />}
        </FormProvider>
    )
}