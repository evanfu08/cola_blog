import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { CARD_SPACING } from '@/consts'
import { HomeDraggableLayer } from './home-draggable-layer'

export default function VideoCard() {
    const center = useCenterStore()
    const { cardStyles } = useConfigStore()
    const styles = (cardStyles as any).videoCard
    const hiCardStyles = cardStyles.hiCard
    const clockStyles = cardStyles.clockCard

    // 放在闹钟下方（与闹钟同列）
    const x = styles?.offsetX !== null ? center.x + (styles?.offsetX ?? 0) : center.x + CARD_SPACING + hiCardStyles.width / 2
    const y = styles?.offsetY !== null ? center.y + (styles?.offsetY ?? 0) : center.y - clockStyles.offset + CARD_SPACING

    const width = styles?.width ?? 215
    const height = styles?.height ?? 286

    return (
        <HomeDraggableLayer cardKey={'videoCard' as any} x={x} y={y} width={width} height={height}>
            <Card className='overflow-hidden p-2 max-sm:static max-sm:translate-0' order={styles?.order ?? 5} width={width} height={height} x={x} y={y}>
                <video
                    src='/videos/cola.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='h-full w-full rounded-[32px] object-cover'
                />
            </Card>
        </HomeDraggableLayer>
    )
}
