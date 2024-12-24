# API Documentation

## Authentication

### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string"
  },
  "token": "string"
}
```

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string"
  }
}
```

## Users

### GET /api/users
Get list of users with pagination.

**Query Parameters:**
- page: number (default: 1)
- limit: number (default: 10)
- search: string (optional)
- role: string (optional)

**Response:**
```json
{
  "users": [
    {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "total": "number",
  "page": "number",
  "totalPages": "number"
}
```

## Dashboard

### GET /api/dashboard/stats
Get dashboard statistics.

**Response:**
```json
{
  "totalUsers": "number",
  "activeUsers": "number",
  "newUsers": "number",
  "systemStatus": "string"
}
```

### GET /api/dashboard/data
Get dashboard chart data.

**Response:**
```json
{
  "userGrowth": [
    {
      "date": "string",
      "value": "number"
    }
  ],
  "activityOverview": [
    {
      "date": "string",
      "value": "number"
    }
  ]
}
```