# Tennis UTR App

A web application to track and manage the Universal Tennis Rating (UTR) of tennis players. The app allows players to view their profiles, UTR ratings, and match history while enabling admins to upload match scores and manage player data. It features both local and global leaderboards.

---

## **Features**
### **Player Features**
- **Profile**: View personal UTR rating and profile information.
- **Leaderboard**: Explore local and global leaderboards to compare rankings.
- **Match History**: Access the complete history of matches played and results.

### **Admin Features**
- **Profile Management**: View all player profiles and their UTR ratings.
- **Match Score Upload**: Add match results to dynamically update player UTRs.
- **Player Management**: Manage player accounts (e.g., activate or deactivate users).

### **Technology Stack**
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

```
backend/
├── config/          # Database configuration
├── controllers/     # Logic for API endpoints
├── middleware/      # Authentication and error handling
├── models/          # Mongoose schemas
├── routes/          # Express.js routes
├── util/            # Helper utilities
└── server.js        # Backend entry point

frontend/
├── public/          # Static HTML and assets
├── src/
│   ├── components/  # Reusable components
│   ├── context/     # Context for state management
│   ├── pages/       # Application pages
│   ├── App.js       # Main application logic
│   ├── index.js     # Frontend entry point
│   └── index.css    # Global styles
```
---

## **Installation**
### **Clone the Repository**
```bash
git clone https://github.com/your-username/tennis-utr-app.git
cd tennis-utr-app
