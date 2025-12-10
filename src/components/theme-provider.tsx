'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/stores/theme-store'
import siteContent from '@/config/site-content.json'

const lightTheme = siteContent.theme
const darkTheme = (siteContent as any).darkTheme || {
    colorBrand: '#4A90E2',
    colorPrimary: '#E8E8E8',
    colorSecondary: '#A0A0A0',
    colorBrandSecondary: '#7EC8E3',
    colorBg: '#0F0F17',
    colorBorder: '#2D2D44',
    colorCard: '#1A1A28CC',
    colorArticle: '#1A1A28EE'
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { isDark, mode, updateAutoTheme } = useThemeStore()

    // 应用主题颜色到 CSS 变量
    useEffect(() => {
        const theme = isDark ? darkTheme : lightTheme
        const root = document.documentElement

        root.style.setProperty('--color-brand', theme.colorBrand)
        root.style.setProperty('--color-primary', theme.colorPrimary)
        root.style.setProperty('--color-secondary', theme.colorSecondary)
        root.style.setProperty('--color-brand-secondary', theme.colorBrandSecondary)
        root.style.setProperty('--color-bg', theme.colorBg)
        root.style.setProperty('--color-border', theme.colorBorder)
        root.style.setProperty('--color-card', theme.colorCard)
        root.style.setProperty('--color-article', theme.colorArticle)

        // 添加 dark class 便于其他样式判断
        if (isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [isDark])

    // 自动模式：每分钟检查时间并切换主题
    useEffect(() => {
        if (mode !== 'auto') return

        // 初始化时更新
        updateAutoTheme()

        // 每分钟检查一次
        const interval = setInterval(() => {
            updateAutoTheme()
        }, 60 * 1000)

        return () => clearInterval(interval)
    }, [mode, updateAutoTheme])

    return <>{children}</>
}
