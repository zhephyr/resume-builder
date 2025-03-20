export default function Sidebar({step}: { step: number }) {
    const steps = ["", "Basic Info", "Skills", "Work History"];

    return (
        <h1 className="w-3/12 h-70 overflow-hidden justify-items-end text-end content-end pe-5">{steps[step]}</h1>
    )
}