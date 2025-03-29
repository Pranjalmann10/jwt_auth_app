# JWT Authentication App

A secure authentication application with JWT implementation.

## Security Setup

This application uses environment variables to secure sensitive information like JWT secrets. Before running the application, you need to set up your environment:

### Setting Up Environment Variables

1. Create a `.env` file in the server directory:
```
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRES_IN=90d
PORT=5001
```

**IMPORTANT: Never commit your `.env` file to version control!** 

The `.gitignore` file has been configured to exclude the `.env` file from being pushed to GitHub.

## Running the Application

1. Install dependencies:
```
# In the server directory
npm install

# In the client/auth-app directory
npm install
```

2. Start the server:
```
# In the server directory
npm start
```

3. Start the client:
```
# In the client/auth-app directory
npm start
```

## Security Best Practices

- Always use environment variables for sensitive information
- Generate a strong, random JWT secret for production
- Regularly rotate your JWT secrets
- Set appropriate expiration times for your tokens
