# CSE 341: Web Services - Contacts API Part 1

A RESTful API for managing contact information built with Node.js, Express, and MongoDB. This project provides endpoints for storing and retrieving contact data with proper MVC architecture and security practices.

## 🎯 Project Overview

This is **Part 1** of the CSE 341 Contacts project, which provides:
- GET endpoints for retrieving all contacts and individual contacts by ID
- MongoDB integration for data persistence
- Proper MVC architecture with separated concerns
- Security best practices with environment variables
- Professional API structure ready for future expansion

## 📋 Features

### Current Implementation (Part 1)
- ✅ **GET /api/contacts** - Retrieve all contacts
- ✅ **GET /api/contacts/:id** - Retrieve a specific contact by MongoDB ObjectId
- ✅ **MongoDB Integration** - Secure connection to MongoDB Atlas
- ✅ **MVC Architecture** - Separated routes, database logic, and server configuration
- ✅ **Environment Security** - Sensitive data stored in `.env` file
- ✅ **CORS Support** - Cross-origin resource sharing enabled
- ✅ **Error Handling** - Proper HTTP status codes and error responses

### Coming in Part 2
- 🔄 POST endpoint for creating new contacts
- 🔄 PUT endpoint for updating existing contacts
- 🔄 DELETE endpoint for removing contacts
- 🔄 Swagger API documentation
- 🔄 Enhanced validation and error handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kigozi-nich/Cse-341.git
   cd Cse-341
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.gy0ribv.mongodb.net/your_database_name
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   npm start
   ```

The server will start on port 3000 (or the port specified in the PORT environment variable).

## 📊 Database Schema

Each contact document contains the following fields:

```json
{
  "_id": "ObjectId",
  "firstName": "String",
  "lastName": "String", 
  "email": "String",
  "favoriteColor": "String",
  "birthday": "String (YYYY-MM-DD format)"
}
```

### Sample Data
The seed script includes three sample contacts:
- Alice Johnson (blue, 1990-04-12)
- Bob Smith (green, 1988-11-23)
- Carol Williams (red, 1995-07-05)

## 🔌 API Endpoints

### Base URL
- **Local Development**: `http://localhost:3000`
- **Production**: `https://your-app.onrender.com`

### Endpoints

#### Get All Contacts
```http
GET /api/contacts
```

**Response (200 OK):**
```json
[
  {
    "_id": "60d0fe4f5311236168a109ca",
    "firstName": "Alice",
    "lastName": "Johnson",
    "email": "alice.johnson@example.com",
    "favoriteColor": "blue",
    "birthday": "1990-04-12"
  },
  {
    "_id": "60d0fe4f5311236168a109cb",
    "firstName": "Bob",
    "lastName": "Smith",
    "email": "bob.smith@example.com",
    "favoriteColor": "green",
    "birthday": "1988-11-23"
  }
]
```

#### Get Contact by ID
```http
GET /api/contacts/:id
```

**Parameters:**
- `id` (path parameter): MongoDB ObjectId of the contact

**Response (200 OK):**
```json
{
  "_id": "60d0fe4f5311236168a109ca",
  "firstName": "Alice",
  "lastName": "Johnson", 
  "email": "alice.johnson@example.com",
  "favoriteColor": "blue",
  "birthday": "1990-04-12"
}
```

**Error Responses:**
- `404 Not Found`: Contact with specified ID doesn't exist
- `500 Internal Server Error`: Database or server error

## 🧪 Testing

### Using the REST Client
The project includes a `contacts.rest` file for easy testing with REST Client extensions:

```http
### Get all contacts
GET http://localhost:3000/api/contacts

### Get single contact (replace id)
GET http://localhost:3000/api/contacts/{{id}}
```

### Using cURL
```bash
# Get all contacts
curl http://localhost:3000/api/contacts

# Get specific contact (replace with actual ObjectId)
curl http://localhost:3000/api/contacts/60d0fe4f5311236168a109ca
```

### Using Postman
1. Import the collection or create requests manually
2. Set base URL to `http://localhost:3000` (local) or your Render URL
3. Test the GET endpoints with proper ObjectIds from the database

## 🏗️ Project Structure

```
Cse-341/
├── data/
│   └── contacts.json          # Seed data for initial contacts
├── db/
│   └── conn.js               # Database connection logic
├── routes/
│   └── contacts.js           # Contact route handlers
├── .env                      # Environment variables (not in repo)
├── .gitignore               # Git ignore rules
├── contacts.rest            # REST client test file
├── package.json             # Project dependencies and scripts
├── seed.js                  # Database seeding script
├── server.js               # Main server file
└── test-mongo-connection.js # MongoDB connection test
```

## 🔒 Security Features

- **Environment Variables**: Sensitive data (MongoDB URI) stored in `.env` file
- **Git Ignore**: `.env` and `node_modules/` excluded from version control
- **CORS**: Cross-origin requests properly configured
- **Error Handling**: No sensitive information leaked in error responses

## 🚀 Deployment

### Render Deployment
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure build settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variable:
   - **Key**: `MONGODB_URI`
   - **Value**: Your MongoDB Atlas connection string
5. Deploy and test the live endpoints

## 📝 Scripts

- `npm start` - Start the production server
- `npm run seed` - Populate database with sample data

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose Driver** - MongoDB object modeling
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing

## 📚 Assignment Requirements (Part 1)

This project fulfills the following CSE 341 W01 requirements:

- ✅ **Set up the project and database**
- ✅ **Import data into the database** 
- ✅ **Complete the GET API routes (get and get all)**
- ✅ **Deploy the app to Render**
- ✅ **Proper MVC architecture**
- ✅ **Security best practices**

## 🎥 Demo

For a complete demonstration of the functionality, see the YouTube video: [Project Demo Link]

## 📞 Contact

- **Student**: Nicholas Kigozi
- **Course**: CSE 341 - Web Services
- **GitHub**: [kigozi-nich/Cse-341](https://github.com/kigozi-nich/Cse-341)

## 📄 License

This project is created for educational purposes as part of the CSE 341 Web Services course.