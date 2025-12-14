import { motion, AnimatePresence } from "motion/react";
import { useModal } from "./useModal";


function Modal() {
    const { isOpen, content, closeModal} = useModal()

    return ( 
         <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs"
          onClick={closeModal}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.3}}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-100"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "tween", ease: "easeOut" }}
          >
            <div className="flex flex-col rounded-lg border-3 border-stone-900 bg-stone-50 p-10">
            {content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    )
}

export default Modal