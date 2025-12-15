# Uppy Image Uploader

A production-ready image uploader built with React and Uppy's headless API, featuring custom UI, Cloudinary integration, and Pinterest-style masonry layout.

## Features

- 🎨 **Custom UI** - Built from scratch using Uppy headless mode (no pre-built components)
- ☁️ **Cloudinary Integration** - Direct browser-to-cloud uploads
- 📱 **Responsive Design** - Works seamlessly on mobile and desktop
- 🖼️ **Masonry Layout** - Pinterest-style image grid with preserved aspect ratios
- 📊 **Progress Tracking** - Per-file and overall upload progress
- ✅ **File Validation** - Image types only, 10MB max file size
- 🎯 **Drag & Drop** - Custom drag-and-drop with visual feedback
- 🔄 **Retry Failed** - Automatic retry for failed uploads
- 🎭 **Multiple UI States** - Empty, uploading, success, error states

## Tech Stack

- **React 19.2.3** - UI framework
- **Uppy 5.2.0** - File upload engine (headless mode)
- **Tailwind CSS 4.1.18** - Styling
- **Cloudinary** - Cloud storage
- **CSS Grid** - Masonry layout

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Cloudinary account (free tier available)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

### Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name from Dashboard
3. Create unsigned upload preset (Settings → Upload)
4. Add credentials to `.env`:

```env
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_preset
```

### Run Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── DropZone/          # Drag-and-drop area
│   ├── FileQueue/         # File list and cards
│   ├── ProgressBar/       # Progress indicators
│   ├── ActionButtons/     # Control buttons
│   └── ErrorBoundary/     # Error handling
├── hooks/
│   ├── useUppy.js         # Uppy instance management
│   └── useFileProgress.js # Progress tracking
├── utils/
│   ├── cloudinaryConfig.js # Cloudinary setup
│   ├── fileValidation.js   # Validation logic
│   └── formatBytes.js      # File size formatting
├── App.js                  # Main component
└── index.js               # Entry point
```

## Key Features

### Uppy Headless Mode

Uses Uppy's core API without any pre-built UI components:

- `@uppy/core` - File handling and state management
- `@uppy/xhr-upload` - XHR uploads to Cloudinary
- `@uppy/thumbnail-generator` - Client-side image previews

### Custom UI Components

All UI built from scratch:

- **DropZone** - Drag-and-drop with click-to-browse
- **FileCard** - Thumbnail, file info, status indicators
- **ProgressBar** - Per-file and aggregate progress
- **ActionButtons** - Upload, cancel, retry, clear

### File Validation

- Accepted: JPG, JPEG, PNG, GIF, WEBP
- Max size: 10MB per file
- User-friendly error messages

### Performance Optimizations

- Memory cleanup for removed files
- Concurrent upload limits
- Lazy loading of thumbnails
- Responsive layout with smooth transitions

## Available Scripts

```bash
npm start      # Development server
npm run build  # Production build
npm test       # Run tests
npm run eject  # Eject from CRA (⚠️ irreversible)
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT

## Author

Built as a technical assignment demonstrating React and Uppy expertise.

---

For detailed implementation plan, see [PLAN.md](PLAN.md)
For setup instructions, see [SETUP.md](SETUP.md)
For task tracking, see [TODO.md](TODO.md)
