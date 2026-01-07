# File Upload with Cloudinary and Multer

A full-stack application for uploading files (images) to Cloudinary using Multer for handling multipart/form-data on the server-side.

## Features

- File upload via React frontend
- Server-side file handling with Multer
- Cloud storage integration with Cloudinary
- TypeScript support on both client and server
- CORS enabled for cross-origin requests

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- ESLint

### Backend

- Node.js
- Express.js
- TypeScript
- Multer (file upload middleware)
- Cloudinary (cloud storage)
- CORS

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Cloudinary account (for API keys)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd File-Managemetn
   ```

2. Install dependencies for both client and server:

   For the client:

   ```bash
   cd client
   npm install
   ```

   For the server:

   ```bash
   cd ../server
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the `server` directory with your Cloudinary credentials:

   ```
   API_KEY=your_cloudinary_api_key
   API_SECRET_KEY=your_cloudinary_api_secret
   ```

## Usage

1. Start the server:

   ```bash
   cd server
   npm run dev
   ```

   The server will run on http://localhost:3000

2. Start the client:

   ```bash
   cd client
   npm run dev
   ```

   The client will run on http://localhost:5173 (default Vite port)

3. Open the client in your browser and upload an image file.

## API Endpoints

### POST /upload

Uploads a file to Cloudinary.

- **Content-Type**: multipart/form-data
- **Body**: image (file)
- **Response**:
  ```json
  {
    "success": true,
    "message": "File uploaded successfully!",
    "url": "https://res.cloudinary.com/...",
    "public_id": "image-123456789"
  }
  ```

## Project Structure

```
File-Managemetn/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.tsx
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── controller/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── package.json
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.
