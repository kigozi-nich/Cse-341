# CSE 341 Contacts API

A simple Node.js Express API for managing contacts with MongoDB.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Copy `.env.example` to `.env` and update with your MongoDB connection string:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/contacts
   PORT=3000
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## Development Commands

- `npm start` - Start the server on port 3000 (or PORT from .env)
- `npm run dev` - Start the server on port 3001 (alternative port)
- `npm run seed` - Seed the database with sample data
- `npm run check-port` - Check what's using port 3000

## Troubleshooting

### Port 3000 already in use

If you get `EADDRINUSE` error, port 3000 is already being used:

**Option 1: Kill the process using the port**
```bash
# Check what's using the port
npm run check-port

# Windows: Kill by PID
taskkill /PID <PID> /F

# macOS/Linux: Kill by PID  
kill -9 <PID>
```

**Option 2: Use a different port**
```bash
# Temporary
PORT=3001 npm start

# Or use the dev script
npm run dev

# Or update .env file
echo "PORT=3001" >> .env
```

### MongoDB connection failed

Make sure:
1. MongoDB is running locally, OR
2. Update `MONGODB_URI` in `.env` with your remote MongoDB connection string
3. The connection string format is correct: `mongodb://localhost:27017/dbname`

## API Endpoints

- `GET /` - Health check
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID

## Database

The API uses MongoDB to store contacts. Make sure MongoDB is running before starting the server.