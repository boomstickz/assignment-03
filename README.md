# The Power Codex
A creative worldbuilding and organization dashboard designed for artists, writers, developers, and worldbuilders. The Power Codex allows users to create structured “dashboards” containing artifacts, powers, abilities, descriptions, images, and color-coded visual themes — all stored in one unified system.

## Features

### Dashboard Creation
- Create themed dashboards for powers, characters, abilities, artifacts, etc.
- Add:
  - Titles  
  - Descriptions  
  - Image uploads (supports multiple images with dynamic layouts)  
  - Tag lists  
  - Ability lists  
  - Custom color codes (hex / rgb)

### Dynamic Visual Rendering
- Dashboard cards auto-generate visual layouts:
  - 0 images → glossy placeholder (or color-coded background)
  - 1–4 images → smart auto-fit grid  
  - Automatic cropping and object-fit to avoid stretching
- Color tags influence:
  - Card title color  
  - Background if no images  
  - Bottom “loading bar” accent (solid or gradient)

### Full CRUD Functionality
- **Create** dashboards  
- **View** full details  
- **Edit** all dashboard fields  
- **Delete** dashboards  
- Replace or remove individual images

### Authentication
- User Registration
- User Login / Logout
- Personalized dashboard collections
- GitHub OAuth login (configure `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, and `GITHUB_CALLBACK_URL`)
- Google login/register buttons are present but intentionally disabled until university authorization is granted for student accounts.

## Visual Aesthetic

- Gold headings with enchanted blue glow  
- Radial + vertical gradient page backgrounds  
- Glossy translucent containers  
- Hover effects with arcane glow emphasis  
- Clean serif headers + modern sans-serif body text  

## 📁 Project Structure
```
/public
   /css/style.css
   /images/...

/views
   /partials/header.ejs
   /partials/footer.ejs
   home.ejs
   dashboardList.ejs
   dashboardShow.ejs
   dashboardCreate.ejs
   dashboardEdit.ejs
   auth-login.ejs
   auth-register.ejs

/routes
   dashboards.js
   auth.js

/controllers
   dashboardController.js
   authController.js

/uploads
   (user images saved here)
```

## Technologies Used

### Frontend
- EJS Templating  
- Bootstrap 5  
- Custom CSS (Glow UI + Gradient UI)

### Backend
- Node.js  
- Express.js  
- Multer (file uploads)  
- MongoDB + Mongoose  

**Ali Alam**  
GitHub: https://github.com/boomstickz  
Project: The Power Codex
