# Percentage Calculator 
This repository contains both the Back-End (Flask + Socket.IO) and Front-End (React + Material UI + Socket.IO) for a percentage calculator application.

## Features
- **User Authentication**: Register, Login, Logout with session support
- **Data Management**: CRUD-like retrieval of data items stored in SQLite
- **Real-Time Calculations**: Percentage & difference calculations via WebSocket
- **Batch Calculations**: Process multiple calculations in one request
- **Health Check**: Simple endpoint to verify server status
- **Responsive UI**: React front-end with Material UI components

## Technologies
### Back-End
- Flask
- Flask-SocketIO
- Flask-SQLAlchemy
- Flask-CORS
- SQLite
- Werkzeug Security

### Front-End
- React
- Material UI (MUI)
- Socket.IO Client

## Back-End Setup
1. Navigate to the backend folder
`cd backend`

2. Create a virtual environment
`python -m venv venv`

3. Activate the virtual environment
`source venv/bin/activate`   On Windows: `venv\Scripts\activate`

4. Install required Python packages
`pip install -r requirements.txt`

5. Run the Flask application
`python app.py`
- Server will run at http://localhost:5000

## Front-End Setup
1. Navigate to the frontend folder
`cd frontend`

2. Install Node.js dependencies
`npm install`

3. Start the React development server
`npm start`
- App will be running at http://localhost:3000
