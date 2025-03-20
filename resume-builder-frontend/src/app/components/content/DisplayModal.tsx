// TODO: Add type for resume vs cover letter
export default function DisplayModal({content, onClose}: {content: string, onClose: () => void}) {
    const onSubmit = async () => {
        const response = await fetch('http://127.0.0.1:8000/generate-cover-letter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })

        const data = await response.json();
        // TODO: close this modal and open a new one with the cover letter
    }

    return (
        <div className="fixed flex top-0 left-0 w-full h-full bg-black/50 z-50 justify-center items-center">
            <div className="relative w-10/12 flex flex-col h-10/12 bg-background rounded-lg px-12 pt-8 pb-6">
                {/* TODO: Change text based on type */}
                <h3>Copy this resume text into a word processor and change it to your liking:</h3>
                <textarea name="resumeText" className="w-full flex-1 outline-accent border-1 border-accent rounded-lg" value={content} />
                <div className="mt-4 flex">
                    <input name="jobUrl" type="text" placeholder="Then if you have a job in mind, paste the job URL here..."
                        className="border-1 border-accent rounded-lg p-2 outline-accent flex-1"
                    />
                    <button type="button" className="h-full bg-primary text-background px-4 py-2 ml-4 rounded-md" onClick={() => {}}>Generate Cover Letter</button>
                </div>
                <div className="absolute top-0 right-0 p-4" onClick={onClose}>
                    <button className="text-accent">X</button>
                </div>
            </div>
        </div>
    )
}