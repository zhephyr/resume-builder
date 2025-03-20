import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function FadeInSlideUp({children}: {children: ReactNode}) {
    return(
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className="w-full mb-15 justify-items-center"
        >
            {children}
        </motion.div>
    )
}