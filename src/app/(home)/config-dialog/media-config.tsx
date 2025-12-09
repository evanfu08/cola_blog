'use client'

import { useState } from 'react'

export interface MusicUpload {
    audio?: File
    cover?: File
    lrc?: File
}

export interface MediaUploads {
    music?: MusicUpload
    video?: File
}

interface MediaConfigProps {
    mediaUploads: MediaUploads
    setMediaUploads: React.Dispatch<React.SetStateAction<MediaUploads>>
    onClose?: () => void
}

export function MediaConfig({ mediaUploads, setMediaUploads, onClose }: MediaConfigProps) {
    const [musicList] = useState([
        {
            name: '英雄',
            artist: '艾志恒Asen',
            src: '/music/asen.mp3',
            cover: '/music/asen.jpg',
            lrc: '/music/asen.lrc'
        }
    ])

    const [videoSrc] = useState('/cola.mp4')

    const handleMusicFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'cover' | 'lrc') => {
        const file = e.target.files?.[0]
        if (!file) return

        setMediaUploads(prev => ({
            ...prev,
            music: {
                ...prev.music,
                [type]: file
            }
        }))
    }

    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setMediaUploads(prev => ({
            ...prev,
            video: file
        }))
    }

    return (
        <div className='space-y-8'>
            {/* 音乐配置 */}
            <div>
                <h3 className='mb-4 text-xl font-semibold'>🎵 音乐配置</h3>
                <div className='bg-card space-y-5 rounded-xl border p-6'>
                    {musicList.map((music, index) => (
                        <div key={index} className='space-y-4'>
                            <div className='flex items-center gap-4'>
                                {music.cover && (
                                    <img src={music.cover} alt={music.name} className='h-16 w-16 rounded-lg object-cover shadow-md' />
                                )}
                                <div className='flex-1'>
                                    <div className='text-lg font-semibold'>{music.name}</div>
                                    <div className='text-secondary mt-1 text-base'>{music.artist}</div>
                                </div>
                            </div>

                            {/* 文件上传区域 */}
                            <div className='grid grid-cols-3 gap-3'>
                                <div>
                                    <label className='text-secondary mb-2 block text-sm font-medium'>音频文件</label>
                                    <div className='relative'>
                                        <input
                                            type='file'
                                            accept='audio/mp3,audio/mpeg'
                                            onChange={(e) => handleMusicFileChange(e, 'audio')}
                                            className='hidden'
                                            id='music-audio-upload'
                                        />
                                        <label
                                            htmlFor='music-audio-upload'
                                            className={`flex cursor-pointer items-center justify-center rounded-lg border border-dashed px-3 py-2 text-sm transition-colors ${mediaUploads.music?.audio
                                                ? 'bg-brand/20 border-brand text-brand'
                                                : 'bg-secondary/10 hover:bg-secondary/20'
                                                }`}
                                        >
                                            {mediaUploads.music?.audio ? '✓ 已选择' : '📁 选择 MP3'}
                                        </label>
                                    </div>
                                    <div className='text-secondary mt-1 truncate text-xs'>
                                        {mediaUploads.music?.audio?.name || music.src}
                                    </div>
                                </div>

                                <div>
                                    <label className='text-secondary mb-2 block text-sm font-medium'>封面图片</label>
                                    <div className='relative'>
                                        <input
                                            type='file'
                                            accept='image/*'
                                            onChange={(e) => handleMusicFileChange(e, 'cover')}
                                            className='hidden'
                                            id='music-cover-upload'
                                        />
                                        <label
                                            htmlFor='music-cover-upload'
                                            className={`flex cursor-pointer items-center justify-center rounded-lg border border-dashed px-3 py-2 text-sm transition-colors ${mediaUploads.music?.cover
                                                ? 'bg-brand/20 border-brand text-brand'
                                                : 'bg-secondary/10 hover:bg-secondary/20'
                                                }`}
                                        >
                                            {mediaUploads.music?.cover ? '✓ 已选择' : '🖼️ 选择图片'}
                                        </label>
                                    </div>
                                    <div className='text-secondary mt-1 truncate text-xs'>
                                        {mediaUploads.music?.cover?.name || music.cover}
                                    </div>
                                </div>

                                <div>
                                    <label className='text-secondary mb-2 block text-sm font-medium'>歌词文件</label>
                                    <div className='relative'>
                                        <input
                                            type='file'
                                            accept='.lrc'
                                            onChange={(e) => handleMusicFileChange(e, 'lrc')}
                                            className='hidden'
                                            id='music-lrc-upload'
                                        />
                                        <label
                                            htmlFor='music-lrc-upload'
                                            className={`flex cursor-pointer items-center justify-center rounded-lg border border-dashed px-3 py-2 text-sm transition-colors ${mediaUploads.music?.lrc
                                                ? 'bg-brand/20 border-brand text-brand'
                                                : 'bg-secondary/10 hover:bg-secondary/20'
                                                }`}
                                        >
                                            {mediaUploads.music?.lrc ? '✓ 已选择' : '📝 选择 LRC'}
                                        </label>
                                    </div>
                                    <div className='text-secondary mt-1 truncate text-xs'>
                                        {mediaUploads.music?.lrc?.name || music.lrc}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 视频配置 */}
            <div>
                <h3 className='mb-4 text-xl font-semibold'>📹 视频配置</h3>
                <div className='bg-card space-y-4 rounded-xl border p-6'>
                    <div className='space-y-3'>
                        <label className='text-secondary block text-base font-medium'>视频文件</label>
                        <div className='flex gap-3'>
                            <input
                                type='text'
                                value={mediaUploads.video?.name || videoSrc}
                                readOnly
                                className='bg-secondary/10 flex-1 rounded-lg border px-4 py-3 text-base'
                            />
                            <div className='relative'>
                                <input
                                    type='file'
                                    accept='video/mp4,video/webm'
                                    onChange={handleVideoFileChange}
                                    className='hidden'
                                    id='video-upload'
                                />
                                <label
                                    htmlFor='video-upload'
                                    className={`flex h-full cursor-pointer items-center justify-center whitespace-nowrap rounded-lg px-6 text-white transition-colors ${mediaUploads.video
                                        ? 'bg-brand/90'
                                        : 'bg-brand hover:bg-brand/90'
                                        }`}
                                >
                                    {mediaUploads.video ? '✓ 已选择' : '📁 选择视频'}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 文件路径说明 */}
            <div className='bg-brand/10 rounded-xl border border-brand/30 p-5'>
                <h4 className='text-brand mb-3 text-lg font-semibold'>📁 相关文件位置</h4>
                <div className='text-secondary space-y-2.5 text-sm leading-relaxed'>
                    <div className='flex items-start gap-2'>
                        <span className='text-brand mt-0.5'>•</span>
                        <div>
                            <span className='font-medium'>音乐配置:</span>
                            <code className='bg-white/60 ml-2 rounded px-2 py-0.5'>src/app/music/list.ts</code>
                        </div>
                    </div>
                    <div className='flex items-start gap-2'>
                        <span className='text-brand mt-0.5'>•</span>
                        <div>
                            <span className='font-medium'>视频组件:</span>
                            <code className='bg-white/60 ml-2 rounded px-2 py-0.5'>src/app/(home)/video-card.tsx</code>
                        </div>
                    </div>
                    <div className='flex items-start gap-2'>
                        <span className='text-brand mt-0.5'>•</span>
                        <div>
                            <span className='font-medium'>音乐组件:</span>
                            <code className='bg-white/60 ml-2 rounded px-2 py-0.5'>src/app/(home)/music-card.tsx</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
