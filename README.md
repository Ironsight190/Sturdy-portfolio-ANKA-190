# Sturdy-portfolio-ANKA-190

Simple Portfolio Website with Login and LocalStorage  
Year 1, Semester 2 of UNASAT Software Engineering

## Features

✅ **Login System**
- Guest login (view-only)
- Creator login (with password protection)
- Password: `creator123`

✅ **Hero Section**
- Display name, occupation, age, hobbies
- Creator can edit directly on the page

✅ **Description Section**
- Short bio/about me text
- Creator can edit

✅ **Cards System (CRUD)**
- Create, Read, Update, Delete cards
- Categories: Projects, Accomplishments, Training
- Edit mode shows edit/delete buttons
- Creator only

✅ **LocalStorage**
- All data persists in browser
- No database needed (yet)

## Project Structure

```
portfolio/
├── index.html       # Main HTML file
├── style.css        # Styling
├── app.js           # JavaScript (login, CRUD, localStorage)
└── README.md
```

## How to Use

### 1. Open the Portfolio
Simply open `index.html` in a browser.

### 2. Login
- **Guest**: View-only mode, no edit buttons
- **Creator**: Enter password `creator123` to unlock edit functionality

### 3. As Creator (Edit Mode)
Click **"Edit"** button in header to toggle edit mode.

**Edit Options:**
- Edit hero info (name, occupation, age, hobbies)
- Edit description
- Add new cards (Projects, Accomplishments, Training)
- Edit existing cards
- Delete cards

### 4. Data is Saved
All changes are saved automatically to browser's LocalStorage.

## Data Storage

- **Location**: Browser LocalStorage (key: `portfolioData`)
- **Format**: JSON
- **Persistence**: Data remains until browser cache is cleared
- **Future**: Can be migrated to backend database

## Default Data

### Hero
- Name: John Doe
- Occupation: Full Stack Developer
- Age: 24
- Hobbies: Coding, Gaming, Reading

### Description
"Welcome to my portfolio! I'm a passionate developer interested in creating beautiful and functional web applications."

### Sample Cards
1. Portfolio Website (Project)
2. Year 1 Completion (Accomplishment)
3. Web Development Bootcamp (Training)

## Customization

Edit `app.js` and modify the `getPortfolioData()` function to change default values.

## Future Enhancements

- [ ] Backend API integration (Node.js + Express + MySQL)
- [ ] Database persistence
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Multiple user support
- [ ] Portfolio sections (skills, experience, etc.)

## Notes

- No server needed to run locally
- Works entirely in the browser
- Changes persist in LocalStorage only (not shared across browsers/devices)
