# CSE 341 Contacts API

A Node.js Express API for managing contacts using MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB database connection

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Cse-341
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file with your MongoDB connection string:

```
MONGODB_URI=mongodb://localhost:27017/contacts
PORT=3000
```

### 4. Start the Server

```bash
# Production mode
npm start

# The server will run on port 3000 by default
# You should see: "Server listening on port 3000"
```

### 5. Seed Database (Optional)

```bash
npm run seed
```

## Available Scripts

- `npm start` - Start the server in production mode
- `npm run seed` - Seed the database with sample data

## API Endpoints

- `GET /` - Health check endpoint
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get contact by ID
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

## Port Configuration

The application runs on port 3000 by default. You can customize the port by:

1. Setting the `PORT` environment variable in your `.env` file
2. Setting the `PORT` environment variable when starting the app:
   ```bash
   PORT=3000 npm start
   ```

## Troubleshooting

### "Could not read package.json" Error

If you encounter this error:
```
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

**Solution:**
1. Make sure you're in the correct project directory:
   ```bash
   cd /path/to/your/Cse-341
   ls -la  # You should see package.json in the list
   ```

2. If package.json is missing, you may need to re-clone the repository:
   ```bash
   git clone <repository-url>
   cd Cse-341
   ```

3. Verify package.json exists:
   ```bash
   cat package.json  # Should display the package.json content
   ```

### Port Already in Use

If port 3000 is already in use:
1. Stop any other applications using port 3000
2. Or change the port in your `.env` file:
   ```
   PORT=3001
   ```

## Project Structure

```
Cse-341/
├── data/           # Data files
├── db/             # Database connection
├── routes/         # API routes
├── .env.example    # Environment variables template
├── .gitignore      # Git ignore file
├── package.json    # Project dependencies and scripts
├── server.js       # Main server file
└── seed.js         # Database seeding script
```