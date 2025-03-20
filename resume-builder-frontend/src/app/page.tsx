'use client'

import { motion } from "framer-motion";
import { createContext, useState } from "react";
import StartScreen from "./components/startScreen";
import Sidebar from "./components/sidebar";
import Content from "./components/content";

export const StepContext = createContext({step: 0, handleStepChange: (step: number) => {}});



export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [step, setStep] = useState(0);
  const handleStepChange = (nextStep: number) => {
    setStep(nextStep);
  }
  
  // TODO: add overscroll amount
  return (
    <div className="w-screen h-screen overflow-x-hidden bg-background">
        <StepContext.Provider value={{step, handleStepChange}}>
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: step > 0 ? "-75%" : "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed top-0 bottom-0 left-0 w-full h-full bg-foreground justify-items-end"
            // ignore initial render trigger
            onAnimationComplete={() => step > 0 ? setAnimationComplete(true) : {}}
          >
            {step > 0 ? <Sidebar step={step} /> : ''}
          </motion.div>

          <div className="relative z-20">
            {step === 0 ? (
              <StartScreen onStart={() => setStep(1)} />
            ) : (
              animationComplete && <Content step={step} />
            )}
          </div>
        </StepContext.Provider>
    </div>
  );
}
