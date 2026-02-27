# API Documentation

Complete API documentation for the Online Course Platform.

## 📚 Accessing the Documentation

Once the server is running, you can access the interactive Swagger documentation at:

```
http://localhost:3000/api-docs
```

## 🔐 Authentication

Most endpoints require authentication. There are two ways to authenticate:

### 1. Bearer Token (Recommended for API calls)
Add the Authorization header to your requests:
```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### 2. Cookie Authentication (Automatic for browser)
After login, tokens are automatically stored in httpOnly cookies.

## 📋 API Endpoints Overview

### Authentication (`/v1/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user
- `GET /me` - Get current user info
- `POST /refreshToken` - Refresh access token
- `POST /sms/code` - Send OTP code
- `POST /sms/verify` - Verify OTP code

### Users (`/v1/users`)
- `GET /` - Get all users (Admin)
- `PUT /updateData` - Update user profile
- `DELETE /remove/:id` - Delete user (Admin)
- `PUT /role` - Change user role (Admin)
- `POST /ban/:id` - Ban user (Admin)

### Courses (`/v1/courses`)
- `GET /` - Get all courses
- `GET /status` - Get course statistics
- `POST /create` - Create course (Admin)
- `GET /:id/session` - Get course sessions
- `POST /:id/session` - Create session (Admin)
- `GET /category/:href` - Get courses by category
- `POST /:id/register` - Register for course
- `GET /:href` - Get course details
- `DELETE /rmCourse/:id` - Delete course (Admin)
- `GET /related/:href` - Get related courses
- `DELETE /session/:id` - Delete session (Admin)

### Categories (`/v1/category`)
- `GET /` - Get all categories (Admin)
- `POST /create` - Create category (Admin)
- `DELETE /:id` - Delete category (Admin)
- `PUT /update/:id` - Update category (Admin)

### Comments (`/v1/comments`)
- `GET /` - Get all comments (Admin)
- `POST /create` - Create comment
- `DELETE /rmComment/:id` - Delete comment (Admin)
- `PUT /acComment/:id` - Accept comment (Admin)
- `PUT /answer/:id` - Reply to comment

### Search (`/v1/search`)
- `GET /` - Search courses and articles (Admin)

## 🔑 Token Management

### Access Token
- Expires in: 15 minutes
- Stored in: httpOnly cookie
- Used for: API authentication

### Refresh Token
- Expires in: 7 days
- Stored in: httpOnly cookie
- Used for: Generating new access tokens

### Token Refresh Flow
1. When access token expires, call `/v1/auth/refreshToken`
2. Server validates refresh token
3. New access token is issued
4. Continue making API calls

## 📝 Request Examples

### Register User
```bash
curl -X POST http://localhost:3000/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "09123456789",
    "password": "SecurePass123",
    "confirmPassword": "SecurePass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "identifire": "john_doe",
    "password": "SecurePass123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:3000/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Create Course (Admin)
```bash
curl -X POST http://localhost:3000/v1/courses/create \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "title=Complete React Course" \
  -F "description=Learn React from scratch" \
  -F "price=299000" \
  -F "category=CATEGORY_ID" \
  -F "cover=@/path/to/cover.jpg" \
  -F "video=@/path/to/intro.mp4"
```

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error",
  "errors": ["Field is required"]
}
```

### 401 Unauthorized
```json
{
  "message": "Access token required!"
}
```

### 403 Forbidden
```json
{
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found!"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error!"
}
```

## 📊 Response Formats

### Success Response
```json
{
  "message": "Operation successful",
  "data": { }
}
```

### List Response
```json
{
  "data": [],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

## 🔒 Security Best Practices

1. **Always use HTTPS in production**
2. **Never expose JWT secrets**
3. **Implement rate limiting**
4. **Validate all inputs**
5. **Use strong passwords**
6. **Keep tokens secure**
7. **Implement CORS properly**

## 🧪 Testing the API

### Using Swagger UI
1. Start the server
2. Navigate to `http://localhost:3000/api-docs`
3. Click "Authorize" button
4. Enter your Bearer token
5. Try out endpoints interactively

### Using Postman
1. Import the API collection
2. Set environment variables
3. Run authentication requests
4. Test other endpoints

### Using cURL
See request examples above

## 📞 Support

For API support or questions:
- Email: support@courseplatform.com
- Documentation: http://localhost:3000/api-docs
- GitHub Issues: [Repository URL]

## 📄 License

MIT License - See LICENSE file for details
