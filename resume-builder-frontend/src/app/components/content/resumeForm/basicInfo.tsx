import FormInput from "../../common/formInput";

export default function BasicInfo() {
    return(
        <div className="w-6/12">
            <FormInput label="First Name" field="firstName" />
            <FormInput label="Last Name" field="lastName" />
            <FormInput label="Email" field="email" type="email" />
            <FormInput label="Phone" field="phone" type="tel" />
        </div>
    )
}