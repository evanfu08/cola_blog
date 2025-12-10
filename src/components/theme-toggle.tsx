'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sun, Moon } from 'lucide-react'
import clsx from 'clsx'
import { useThemeStore } from '@/stores/theme-store'

interface ThemeToggleProps {
    className?: string
    delay?: number
}

export default function ThemeToggle({ delay, className }: ThemeToggleProps) {
    const { isDark, mode, toggleTheme } = useThemeStore()
    const [show, setShow] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, delay || 1000)
    }, [delay])

    if (!show) return null

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label='Toggle theme'
            onClick={toggleTheme}
            className={clsx(
                'card relative overflow-visible rounded-full p-3',
                className
            )}>
            {/* 模式指示器 */}
            {mode === 'auto' && (
                <motion.span
                    initial={{ scale: 0.4 }}
                    animate={{ scale: 1 }}
                    className='absolute -top-2 left-9 min-w-6 rounded-full bg-brand px-1.5 py-1 text-center text-[10px] text-white'>
                    自动
                </motion.span>
            )}

            <motion.div
                animate={{ rotate: isDark ? 0 : 360 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}>
                <AnimatePresence mode='wait'>
                    {isDark ? (
                        <motion.div
                            key='moon'
                            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            transition={{ duration: 0.2 }}>
                            <Moon className='fill-indigo-300 text-indigo-400' size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key='sun'
                            initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                            transition={{ duration: 0.2 }}>
                            <Sun className='fill-amber-300 text-amber-400' size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.button>
    )
}
