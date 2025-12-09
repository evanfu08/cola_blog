# COLA 个人博客

基于 [YYsuni/2025-blog-public](https://github.com/YYsuni/2025-blog-public) 项目修改而来。

## 致谢

感谢原项目作者 [YYsuni](https://github.com/YYsuni) 提供的优秀博客模板！

## 定制化修改

### 视觉设计
- 🎨 浅海风格配色主题
- 🖼️ 个人品牌 COLA
- 🎭 自定义头像和 Favicon

### 功能增强
- 🎵 音乐播放器（支持 LRC 歌词同步显示）
- 📹 视频卡片展示
- 📁 媒体文件上传功能
- 🎨 7 种配色预设方案

### 内容优化
- 🧹 简化导航栏
- ❌ 移除友链页面
- 📝 清理示例文章

## 部署说明

详细的部署步骤请参考原项目：
👉 [https://github.com/YYsuni/2025-blog-public](https://github.com/YYsuni/2025-blog-public)

### 快速开始

1. Fork 本项目
2. 部署到 Vercel
3. 创建 GitHub App
4. 配置环境变量
5. 导入私钥开始使用

## 环境变量

```env
NEXT_PUBLIC_GITHUB_OWNER=你的用户名
NEXT_PUBLIC_GITHUB_REPO=你的仓库名
NEXT_PUBLIC_GITHUB_BRANCH=main
NEXT_PUBLIC_GITHUB_APP_ID=你的AppID
NEXT_PUBLIC_GITHUB_ENCRYPT_KEY=你的加密密钥
```

## 技术栈

- **框架**: Next.js 16 + React 19
- **样式**: Tailwind CSS
- **动画**: Motion (Framer Motion)
- **部署**: Vercel
- **内容管理**: GitHub API + GitHub App

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 特色功能

### 音乐播放器
- 实时进度条（支持点击/拖动）
- LRC 歌词同步显示（Toast 弹窗）
- 封面展示
- 播放/暂停控制

### 配置系统
- 网站设置
- 色彩配置（7 种预设）
- 首页布局（拖拽调整）
- 媒体配置（上传音乐/视频）

### 安全机制
- GitHub App 认证
- 私钥加密存储
- 权限控制

## 联系方式

- GitHub: [evanfu08](https://github.com/evanfu08)
- Bilibili: [COLA](https://space.bilibili.com/480455454)
- X (Twitter): [@evanfu08](https://x.com/evanfu08)
- Telegram: [@evanfu08](https://t.me/evanfu08)
- Email: [1771005798@qq.com](mailto:1771005798@qq.com)

## 开源协议

MIT License

---

再次感谢 [YYsuni](https://github.com/YYsuni) 的开源贡献！🙏
