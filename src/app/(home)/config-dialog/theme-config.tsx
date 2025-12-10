'use client'

import { useThemeStore, type ThemeMode } from '@/stores/theme-store'
import { Moon, Sun, Clock } from 'lucide-react'
import clsx from 'clsx'

const THEME_MODES: { id: ThemeMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'light', label: '浅色', icon: <Sun size={20} />, desc: '始终使用浅色主题' },
    { id: 'dark', label: '深色', icon: <Moon size={20} />, desc: '始终使用深色主题' },
    { id: 'auto', label: '自动', icon: <Clock size={20} />, desc: '6:00-18:00 浅色，其他时间深色' }
]

export function ThemeConfig() {
    const { mode, setMode, isDark } = useThemeStore()

    return (
        <div className='space-y-6'>
            <div>
                <h3 className='mb-4 text-sm font-medium'>主题模式</h3>
                <div className='grid grid-cols-3 gap-3'>
                    {THEME_MODES.map(item => (
                        <button
                            key={item.id}
                            type='button'
                            onClick={() => setMode(item.id)}
                            className={clsx(
                                'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                                mode === item.id
                                    ? 'border-brand bg-brand/10 text-brand'
                                    : 'border-transparent bg-secondary/10 text-secondary hover:border-brand/30'
                            )}>
                            {item.icon}
                            <span className='text-sm font-medium'>{item.label}</span>
                            <span className='text-xs opacity-60'>{item.desc}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className='rounded-xl border bg-secondary/5 p-4'>
                <div className='flex items-center gap-3'>
                    <div className={clsx('rounded-full p-2', isDark ? 'bg-indigo-500/20' : 'bg-amber-500/20')}>
                        {isDark ? <Moon className='text-indigo-400' size={20} /> : <Sun className='text-amber-400' size={20} />}
                    </div>
                    <div>
                        <div className='text-sm font-medium'>当前主题：{isDark ? '深色' : '浅色'}</div>
                        <div className='text-xs text-secondary'>
                            {mode === 'auto' ? '根据时间自动切换' : '手动设置'}
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-xs text-secondary'>
                <p>💡 提示：您也可以点击首页的主题切换按钮快速切换主题模式</p>
            </div>
        </div>
    )
}
