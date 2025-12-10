'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'auto'

interface ThemeStore {
    isDark: boolean
    mode: ThemeMode
    setMode: (mode: ThemeMode) => void
    toggleTheme: () => void
    updateAutoTheme: () => void
}

// 判断当前时间是否应该使用深色主题
// 早上6点到晚上6点使用浅色，其他时间使用深色
function shouldBeDark(): boolean {
    const hour = new Date().getHours()
    return hour < 6 || hour >= 18
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            isDark: false,
            mode: 'auto' as ThemeMode,

            setMode: (mode: ThemeMode) => {
                let isDark = false
                if (mode === 'dark') {
                    isDark = true
                } else if (mode === 'auto') {
                    isDark = shouldBeDark()
                }
                set({ mode, isDark })
            },

            toggleTheme: () => {
                const { mode, isDark } = get()
                if (mode === 'auto') {
                    // 从自动模式切换到手动模式
                    set({ mode: isDark ? 'light' : 'dark', isDark: !isDark })
                } else {
                    // 在手动模式之间切换
                    set({ mode: isDark ? 'light' : 'dark', isDark: !isDark })
                }
            },

            updateAutoTheme: () => {
                const { mode } = get()
                if (mode === 'auto') {
                    set({ isDark: shouldBeDark() })
                }
            }
        }),
        {
            name: 'theme-storage',
            partialize: (state) => ({ mode: state.mode, isDark: state.isDark })
        }
    )
)
