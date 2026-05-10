import { motion } from 'framer-motion'

export function SuccessOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        style={{ width: 96, height: 96, background: 'rgba(34, 197, 94, 0.2)', border: '2px solid rgba(34, 197, 94, 0.6)' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4, type: 'spring', stiffness: 200 }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <motion.path
            d="M12 24 L21 33 L36 16"
            stroke="rgb(34, 197, 94)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}
