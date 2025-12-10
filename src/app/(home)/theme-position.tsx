import ThemeToggle from '@/components/theme-toggle'
import { ANIMATION_DELAY, CARD_SPACING } from '@/consts'
import { motion } from 'motion/react'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { HomeDraggableLayer } from './home-draggable-layer'

export default function ThemePosition() {
    const center = useCenterStore()
    const { cardStyles } = useConfigStore()
    const styles = (cardStyles as any).themeToggle
    const likeStyles = cardStyles.likePosition

    // 如果没有配置，使用默认值
    if (!styles) return null

    // 默认放在点赞按钮旁边
    const likeX = likeStyles.offsetX !== null ? center.x + likeStyles.offsetX : center.x
    const likeY = likeStyles.offsetY !== null ? center.y + likeStyles.offsetY : center.y

    const x = styles.offsetX !== null ? center.x + styles.offsetX : likeX - 60
    const y = styles.offsetY !== null ? center.y + styles.offsetY : likeY

    return (
        <HomeDraggableLayer cardKey='themeToggle' x={x} y={y} width={styles.width} height={styles.height}>
            <motion.div className='absolute max-sm:static' initial={{ left: x, top: y }} animate={{ left: x, top: y }}>
                <ThemeToggle delay={(styles.order || 9) * ANIMATION_DELAY * 1000} />
            </motion.div>
        </HomeDraggableLayer>
    )
}
