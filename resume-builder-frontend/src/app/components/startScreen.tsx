export default function StartScreen({onStart}: { onStart: () => void }){
    return(
        <div className="content-center text-center justify-items-center h-screen w-screen bg-foreground">
            <h1 className="w-full">AI Resume Builder</h1>
            <button onClick={onStart} className="bg-primary text-accent px-8 py-4 text-2xl rounded-4xl">Let's get you hired!</button>
        </div>
    )
}