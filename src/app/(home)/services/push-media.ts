import { toBase64Utf8, getRef, createTree, createCommit, updateRef, createBlob, type TreeItem } from '@/lib/github-client'
import { getAuthToken } from '@/lib/auth'
import { GITHUB_CONFIG } from '@/consts'
import { toast } from 'sonner'
import { fileToBase64NoPrefix } from '@/lib/file-utils'

export interface MusicUpload {
    audio?: File
    cover?: File
    lrc?: File
}

export interface MediaUploads {
    music?: MusicUpload
    video?: File
}

export async function pushMediaFiles(uploads: MediaUploads): Promise<void> {
    const token = await getAuthToken()

    toast.info('正在获取分支信息...')
    const refData = await getRef(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, `heads/${GITHUB_CONFIG.BRANCH}`)
    const latestCommitSha = refData.sha

    const commitMessage = `更新媒体文件`

    toast.info('正在准备文件...')

    const treeItems: TreeItem[] = []

    // 上传音乐文件
    if (uploads.music) {
        const { audio, cover, lrc } = uploads.music

        if (audio) {
            toast.info('正在上传音频文件...')
            const contentBase64 = await fileToBase64NoPrefix(audio)
            const blobData = await createBlob(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, contentBase64, 'base64')
            treeItems.push({
                path: 'public/music/asen.mp3',
                mode: '100644',
                type: 'blob',
                sha: blobData.sha
            })
        }

        if (cover) {
            toast.info('正在上传封面图片...')
            const contentBase64 = await fileToBase64NoPrefix(cover)
            const blobData = await createBlob(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, contentBase64, 'base64')
            treeItems.push({
                path: 'public/music/asen.jpg',
                mode: '100644',
                type: 'blob',
                sha: blobData.sha
            })
        }

        if (lrc) {
            toast.info('正在上传歌词文件...')
            const contentBase64 = await fileToBase64NoPrefix(lrc)
            const blobData = await createBlob(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, contentBase64, 'base64')
            treeItems.push({
                path: 'public/music/asen.lrc',
                mode: '100644',
                type: 'blob',
                sha: blobData.sha
            })
        }
    }

    // 上传视频文件
    if (uploads.video) {
        toast.info('正在上传视频文件...')
        const contentBase64 = await fileToBase64NoPrefix(uploads.video)
        const blobData = await createBlob(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, contentBase64, 'base64')
        treeItems.push({
            path: 'public/cola.mp4',
            mode: '100644',
            type: 'blob',
            sha: blobData.sha
        })
    }

    if (treeItems.length === 0) {
        toast.error('没有文件需要上传')
        return
    }

    toast.info('正在创建文件树...')
    const treeData = await createTree(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, treeItems, latestCommitSha)

    toast.info('正在创建提交...')
    const commitData = await createCommit(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, commitMessage, treeData.sha, [latestCommitSha])

    toast.info('正在更新分支...')
    await updateRef(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, `heads/${GITHUB_CONFIG.BRANCH}`, commitData.sha)

    toast.success('媒体文件上传成功！')
}
