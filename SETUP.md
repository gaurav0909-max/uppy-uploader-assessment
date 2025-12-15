# Setup Instructions

## Quick Start

### 1. Navigate to Project
```bash
cd "D:\Projects\assessments\uppy-image-uploader"
```

### 2. Install Dependencies

#### Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

#### Install Uppy Dependencies
```bash
npm install @uppy/core @uppy/xhr-upload @uppy/thumbnail-generator
```

#### Install PropTypes
```bash
npm install prop-types
```

### 3. Configure Tailwind CSS

Update `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Set Up Cloudinary

1. Create account at https://cloudinary.com
2. Go to Settings → Upload
3. Create an unsigned upload preset
4. Note your cloud name

### 5. Create Environment File

Create `.env` in project root:
```env
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_preset_here
```

Create `.env.example` for reference:
```env
REACT_APP_CLOUDINARY_CLOUD_NAME=
REACT_APP_CLOUDINARY_UPLOAD_PRESET=
```

### 6. Create Folder Structure

```bash
mkdir src/components src/hooks src/utils
mkdir src/components/DropZone src/components/FileQueue src/components/ProgressBar src/components/ActionButtons src/components/ErrorBoundary
```

### 7. Start Development Server
```bash
npm start
```

---

## Cloudinary Setup Details

### Step 1: Sign Up
Go to https://cloudinary.com and create a free account

### Step 2: Get Cloud Name
- Navigate to Dashboard
- Find your "Cloud Name" at the top
- Copy it to your `.env` file

### Step 3: Create Upload Preset
- Go to Settings → Upload
- Scroll to "Upload presets"
- Click "Add upload preset"
- Set mode to "Unsigned"
- Set folder name (optional): "uppy-uploads"
- Save the preset name

### Step 4: Configure Environment
Add to `.env`:
```env
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_preset_name
```

---

## Git Setup

### Initialize Repository (if needed)
```bash
git init
git add .
git commit -m "initial project setup"
```

### Connect to Remote (optional)
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

---

## Troubleshooting

### Issue: Tailwind not working
- Make sure `tailwind.config.js` content paths are correct
- Restart dev server after config changes
- Check `index.css` has Tailwind directives

### Issue: Cloudinary upload fails
- Verify cloud name and preset in `.env`
- Check preset is set to "unsigned"
- Look for CORS errors in browser console

### Issue: Uppy errors
- Check all packages installed: `@uppy/core`, `@uppy/xhr-upload`, `@uppy/thumbnail-generator`
- Verify import statements are correct

---

## Development Workflow

1. Check `TODO.md` for current tasks
2. Work on one feature at a time
3. Test in browser
4. Make commit when feature works
5. Move to next task

---

## Useful Commands

```bash
# Install new package
npm install package-name

# Start dev server
npm start

# Build for production
npm run build

# Check git status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name
```

---

## Resources

- Uppy Docs: https://uppy.io/docs/
- Tailwind Docs: https://tailwindcss.com/docs
- Cloudinary Docs: https://cloudinary.com/documentation
- React Docs: https://react.dev
