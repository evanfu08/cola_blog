'use client'

import { useState, useRef, useEffect } from 'react'
import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { CARD_SPACING } from '@/consts'
import PlaySVG from '@/svgs/play.svg'
import { HomeDraggableLayer } from './home-draggable-layer'
import { list } from '@/app/music/list'
import { toast } from 'sonner'

interface LrcLine {
	time: number
	text: string
}

function parseLrc(lrcText: string): LrcLine[] {
	const lines = lrcText.split('\n')
	const result: LrcLine[] = []

	for (const line of lines) {
		const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]\s*(.*)/)
		if (match) {
			const minutes = parseInt(match[1])
			const seconds = parseInt(match[2])
			const ms = parseInt(match[3])
			const time = minutes * 60 + seconds + ms / (match[3].length === 3 ? 1000 : 100)
			const text = match[4].trim()
			if (text && !text.startsWith('词') && !text.startsWith('曲') && !text.startsWith('编曲') && !text.startsWith('混音') && !text.startsWith('Mastered')) {
				result.push({ time, text })
			}
		}
	}

	return result
}

export default function MusicCard() {
	const center = useCenterStore()
	const { cardStyles } = useConfigStore()
	const styles = cardStyles.musicCard
	const hiCardStyles = cardStyles.hiCard
	const clockCardStyles = cardStyles.clockCard
	const videoCardStyles = (cardStyles as any).videoCard

	const [isPlaying, setIsPlaying] = useState(false)
	const [progress, setProgress] = useState(0)
	const audioRef = useRef<HTMLAudioElement>(null)
	const lyricsRef = useRef<LrcLine[]>([])
	const lastLyricIndexRef = useRef(-1)
	const animationFrameRef = useRef<number | undefined>(undefined)

	const currentTrack = list[0]
	const displayName = currentTrack ? `${currentTrack.name}-${currentTrack.artist}` : '随机音乐'

	const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + CARD_SPACING + hiCardStyles.width / 2 - styles.offset
	const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y - clockCardStyles.offset + CARD_SPACING + videoCardStyles.height + CARD_SPACING

	// 加载歌词
	useEffect(() => {
		if (currentTrack?.lrc) {
			fetch(currentTrack.lrc)
				.then(res => res.text())
				.then(text => {
					const parsed = parseLrc(text)
					lyricsRef.current = parsed
					console.log('✅ 歌词加载成功:', parsed.length, '行')
				})
				.catch(err => {
					console.error('❌ 歌词加载失败:', err)
				})
		}
	}, [currentTrack?.lrc])

	// 使用 requestAnimationFrame 更新进度和歌词
	const updateProgress = () => {
		const audio = audioRef.current
		if (!audio || !audio.duration) {
			animationFrameRef.current = requestAnimationFrame(updateProgress)
			return
		}

		const currentProgress = (audio.currentTime / audio.duration) * 100
		setProgress(currentProgress)

		// 显示歌词
		const lyrics = lyricsRef.current
		if (lyrics.length > 0) {
			const currentTime = audio.currentTime
			for (let i = lyrics.length - 1; i >= 0; i--) {
				if (currentTime >= lyrics[i].time) {
					if (i !== lastLyricIndexRef.current) {
						lastLyricIndexRef.current = i
						console.log('🎵 歌词:', lyrics[i].text)
						toast(lyrics[i].text, {
							duration: 3000,
							position: 'bottom-right'
						})
					}
					break
				}
			}
		}

		animationFrameRef.current = requestAnimationFrame(updateProgress)
	}

	const togglePlay = async () => {
		const audio = audioRef.current
		if (!audio) {
			console.error('❌ Audio 元素未找到')
			return
		}

		try {
			if (isPlaying) {
				console.log('⏸️ 暂停播放')
				audio.pause()
				if (animationFrameRef.current) {
					cancelAnimationFrame(animationFrameRef.current)
				}
				setIsPlaying(false)
			} else {
				console.log('▶️ 尝试播放...')
				await audio.play()
				console.log('✅ 播放成功')
				setIsPlaying(true)
				animationFrameRef.current = requestAnimationFrame(updateProgress)
			}
		} catch (err: any) {
			console.error('❌ 播放失败:', err)
			toast.error('播放失败: ' + err.message)
			setIsPlaying(false)
		}
	}

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return

		const handleEnded = () => {
			console.log('🏁 播放结束')
			setIsPlaying(false)
			setProgress(0)
			lastLyricIndexRef.current = -1
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}

		const handleLoadedMetadata = () => {
			console.log('📊 音频元数据加载完成, 时长:', Math.floor(audio.duration), '秒')
		}

		const handleError = () => {
			console.error('❌ 音频加载错误')
			toast.error('音频加载失败')
		}

		audio.addEventListener('ended', handleEnded)
		audio.addEventListener('loadedmetadata', handleLoadedMetadata)
		audio.addEventListener('error', handleError)

		return () => {
			audio.removeEventListener('ended', handleEnded)
			audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
			audio.removeEventListener('error', handleError)
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current)
			}
		}
	}, [])

	const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		const audio = audioRef.current
		if (!audio || !audio.duration) return

		const progressBar = e.currentTarget
		const rect = progressBar.getBoundingClientRect()

		const updateTime = (clientX: number) => {
			const x = clientX - rect.left
			const percent = Math.max(0, Math.min(1, x / rect.width))
			audio.currentTime = percent * audio.duration
		}

		updateTime(e.clientX)

		const handleMouseMove = (e: MouseEvent) => {
			updateTime(e.clientX)
		}

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove)
			document.removeEventListener('mouseup', handleMouseUp)
		}

		document.addEventListener('mousemove', handleMouseMove)
		document.addEventListener('mouseup', handleMouseUp)
	}

	return (
		<HomeDraggableLayer cardKey='musicCard' x={x} y={y} width={styles.width} height={styles.height}>
			<Card order={styles.order} width={styles.width} height={styles.height} x={x} y={y} className='flex items-center gap-3'>
				<audio ref={audioRef} src={currentTrack?.src} preload="auto" />

				{currentTrack?.cover ? (
					<img src={currentTrack.cover} alt={currentTrack.name} className='h-10 w-10 rounded-lg object-cover' />
				) : (
					<div className='bg-secondary/20 h-10 w-10 rounded-lg' />
				)}

				<div className='flex-1 overflow-hidden'>
					<div className='text-secondary text-sm truncate'>{displayName}</div>

					<div
						className='mt-1 h-2 rounded-full bg-white/60 cursor-pointer'
						onMouseDown={handleProgressMouseDown}
					>
						<div className='bg-linear h-full rounded-full transition-all' style={{ width: `${progress}%` }} />
					</div>
				</div>

				<button
					onClick={togglePlay}
					className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white hover:scale-105 transition-transform'>
					{isPlaying ? (
						<div className='flex gap-0.5'>
							<div className='bg-brand h-4 w-1 rounded-sm' />
							<div className='bg-brand h-4 w-1 rounded-sm' />
						</div>
					) : (
						<PlaySVG className='text-brand ml-1 h-4 w-4' />
					)}
				</button>
			</Card>
		</HomeDraggableLayer>
	)
}
