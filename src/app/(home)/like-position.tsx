import LikeButton from '@/components/like-button'
import { ANIMATION_DELAY, CARD_SPACING } from '@/consts'
import { motion } from 'motion/react'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { HomeDraggableLayer } from './home-draggable-layer'

export default function LikePosition() {
	const center = useCenterStore()
	const { cardStyles } = useConfigStore()
	const styles = cardStyles.likePosition
	const hiCardStyles = cardStyles.hiCard
	const socialButtonsStyles = cardStyles.socialButtons
	const clockCardStyles = cardStyles.clockCard
	const videoCardStyles = (cardStyles as any).videoCard
	const musicCardStyles = cardStyles.musicCard
	const shareCardStyles = cardStyles.shareCard

	const x =
		styles.offsetX !== null ? center.x + styles.offsetX : center.x + hiCardStyles.width / 2 - socialButtonsStyles.width + shareCardStyles.width + CARD_SPACING
	// 与音乐播放器 y 坐标对齐（垂直居中）
	const musicY = center.y - clockCardStyles.offset + CARD_SPACING + videoCardStyles.height + CARD_SPACING
	const y =
		styles.offsetY !== null
			? center.y + styles.offsetY
			: musicY + (musicCardStyles.height - styles.height) / 2

	return (
		<HomeDraggableLayer cardKey='likePosition' x={x} y={y} width={styles.width} height={styles.height}>
			<motion.div className='absolute max-sm:static' initial={{ left: x, top: y }} animate={{ left: x, top: y }}>
				<LikeButton delay={cardStyles.shareCard.order * ANIMATION_DELAY * 1000} />
			</motion.div>
		</HomeDraggableLayer>
	)
}
