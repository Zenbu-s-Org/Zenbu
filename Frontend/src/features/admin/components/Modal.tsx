import { motion, AnimatePresence } from "motion/react"
import { Container } from "@/components/ui"

type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal({ open, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs"
          onClick={onClose}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.3}}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-100"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "tween", ease: "easeOut" }}
          >
            <Container className="min-h-100 flex flex-col">
            {children}
            </Container>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal