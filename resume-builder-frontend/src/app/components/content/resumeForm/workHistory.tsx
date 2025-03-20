import { useFieldArray, useFormContext } from "react-hook-form";
import FormInput from "../../common/formInput";
import ContentBreak from "../../common/contentBreak";

export default function WorkHistory() {
    const {register} = useFormContext();
    const {fields, append, remove} = useFieldArray({name: 'workHistory'});

    return (
      <div className="w-8/12">
      {fields.map((field, index) => (
        <div key={field.id} className="w-full justify-items-center mb-12">
          {index > 0 ? <ContentBreak /> : ''}
          <h2 className="relative w-full left-0 text-accent">{index+1} of 5</h2>
          <FormInput label="Position" field={`workHistory.${index}.jobTitle`} />
          <FormInput label="Company" field={`workHistory.${index}.company`} />
          <FormInput label="Location" field={`workHistory.${index}.location`} />
          <div className="w-full flex gap-12">
            <FormInput label="Start Date" field={`workHistory.${index}.startDate`} type="date" />
            <FormInput label="End Date" field={`workHistory.${index}.endDate`} type="date" />
          </div>
          <div className="w-full">
            <h3 className="p-1">Responsibilities:</h3>
            <textarea className="w-full h-[4lh] p-2 outline-none border-1 border-accent rounded-md focus:border-primary focus:border-2"
              {...register(`workHistory.${index}.responsibilities`)} placeholder="Tell us what you did..." 
            />
          </div>
        </div>
      ))}
      <div className="flex w-full justify-between">
        <button className="bg-success text-background p-4 rounded-md" type="button" onClick={() => fields.length < 5 ? append(fields.length + 1) : {}}>Add Work History</button>
        <button className="bg-failure text-background p-4 rounded-md" type="button" onClick={() => remove(fields.length - 1)}>Remove</button>
      </div>
    </div>
  );
}