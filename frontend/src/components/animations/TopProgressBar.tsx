import { AnimatePresence, motion } from 'framer-motion'

export function TopProgressBar({ loading }: { loading: boolean }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 z-[100] h-[2px]"
          style={{
            background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #7c3aed)',
            backgroundSize: '200% 100%',
          }}
          initial={{ width: '0%', opacity: 1 }}
          animate={{
            width: '85%',
            backgroundPosition: ['0% 0%', '100% 0%'],
            transition: { width: { duration: 1.5, ease: 'easeInOut' }, backgroundPosition: { duration: 1.5, repeat: Infinity } },
          }}
          exit={{ width: '100%', opacity: 0, transition: { duration: 0.3 } }}
        />
      )}
    </AnimatePresence>
  )
}
