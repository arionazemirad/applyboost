# ApplyBoost.ai API Documentation

## Overview

The ApplyBoost.ai API provides endpoints for resume optimization, job posting analysis, and application tracking. All endpoints require authentication except for public routes.

## Authentication

All API routes are protected using Supabase authentication. Include the user's session token in the request headers.

```
Authorization: Bearer <supabase-jwt-token>
```

## Base URL

```
https://your-domain.com/api
```

## Endpoints

### Resume Management

#### Upload Resume

```http
POST /api/resume/upload
Content-Type: multipart/form-data

Body:
- file: File (PDF or DOCX, max 10MB)
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "resume_id",
    "filename": "resume.pdf",
    "fileUrl": "https://storage.url/resume.pdf",
    "uploadedAt": "2024-01-15T10:30:00Z",
    "contentPreview": "John Doe Software Engineer..."
  }
}
```

#### Get User Resumes

```http
GET /api/resume/upload
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "resume_id",
      "filename": "resume.pdf",
      "fileUrl": "https://storage.url/resume.pdf",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "optimized": true,
      "scoreBefore": 78,
      "scoreAfter": 92
    }
  ]
}
```

#### Get Resume Details

```http
GET /api/resume/{id}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "resume_id",
    "filename": "resume.pdf",
    "content": "Full resume text content...",
    "applications": [...],
    "optimizations": [...]
  }
}
```

#### Delete Resume

```http
DELETE /api/resume/{id}
```

### Job Posting Management

#### Upload Job Posting

```http
POST /api/job/upload
Content-Type: application/json

Body:
{
  "title": "Senior Frontend Developer",
  "company": "TechCorp Inc.",
  "content": "Job description text..."
}
```

**Or with file upload:**

```http
POST /api/job/upload
Content-Type: multipart/form-data

Body:
- file: File (PDF or DOCX)
- title: string (optional)
- company: string (optional)
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "job_id",
    "title": "Senior Frontend Developer",
    "company": "TechCorp Inc.",
    "keywords": ["React", "TypeScript", "Node.js"],
    "keywordCategories": {
      "technical_skills": ["React", "TypeScript"],
      "soft_skills": ["teamwork", "communication"]
    },
    "createdAt": "2024-01-15T10:30:00Z",
    "contentPreview": "We are looking for..."
  }
}
```

#### Get User Job Posts

```http
GET /api/job/upload
```

#### Get Job Post Details

```http
GET /api/job/{id}
```

#### Delete Job Post

```http
DELETE /api/job/{id}
```

### Resume Optimization

#### Optimize Resume

```http
POST /api/optimize
Content-Type: application/json

Body:
{
  "resumeId": "resume_id",
  "jobPostId": "job_id"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "optimizationId": "optimization_id",
    "scoreBefore": 78,
    "scoreAfter": 92,
    "improvement": 14,
    "addedKeywords": ["React.js", "TypeScript", "Agile"],
    "optimizedText": "Optimized resume content...",
    "suggestions": [
      "Add more quantifiable achievements",
      "Include specific technologies"
    ],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get Optimization History

```http
GET /api/optimize
```

**Response:**

```json
{
  "success": true,
  "data": {
    "optimizations": [...],
    "summary": {
      "totalOptimizations": 5,
      "averageImprovement": 16,
      "totalKeywordsAdded": 23
    }
  }
}
```

### Application Tracking

#### Create Application

```http
POST /api/applications/track
Content-Type: application/json

Body:
{
  "jobTitle": "Senior Frontend Developer",
  "company": "TechCorp Inc.",
  "resumeId": "resume_id",
  "jobPostId": "job_id", // optional
  "status": "Applied", // "Saved" | "Applied" | "Interview" | "Offer" | "Rejected"
  "notes": "Applied through LinkedIn"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "application_id",
    "jobTitle": "Senior Frontend Developer",
    "company": "TechCorp Inc.",
    "status": "Applied",
    "appliedDate": "2024-01-15T10:30:00Z",
    "matchScore": 92,
    "resume": {
      "id": "resume_id",
      "filename": "resume.pdf"
    },
    "jobPost": {
      "id": "job_id",
      "title": "Senior Frontend Developer"
    }
  }
}
```

#### Get Applications

```http
GET /api/applications/track?page=1&limit=10&status=Applied&search=TechCorp
```

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10, max: 100)
- `status`: Filter by status ("all" | "Saved" | "Applied" | "Interview" | "Offer" | "Rejected")
- `search`: Search in job title or company name

**Response:**

```json
{
  "success": true,
  "data": {
    "applications": [...],
    "summary": {
      "Saved": 2,
      "Applied": 5,
      "Interview": 1,
      "Offer": 1,
      "Rejected": 2
    }
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 11,
    "totalPages": 2
  }
}
```

#### Get Application Details

```http
GET /api/applications/{id}
```

#### Update Application

```http
PATCH /api/applications/{id}
Content-Type: application/json

Body:
{
  "status": "Interview",
  "notes": "Phone interview scheduled for tomorrow"
}
```

#### Delete Application

```http
DELETE /api/applications/{id}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {} // Additional error details
  }
}
```

### Common Error Codes

- `AUTH_REQUIRED`: Authentication required (401)
- `VALIDATION_ERROR`: Request validation failed (400)
- `NOT_FOUND`: Resource not found (404)
- `CONFLICT`: Resource already exists (409)
- `INTERNAL_ERROR`: Server error (500)

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- 100 requests per minute per user for most endpoints
- 10 requests per minute for file upload endpoints
- 20 requests per minute for optimization endpoints

## File Upload Specifications

### Supported File Types

- PDF (.pdf)
- Microsoft Word (.docx)

### File Size Limits

- Maximum file size: 10MB
- Recommended size: Under 5MB for faster processing

### Storage

Files are stored securely in Supabase Storage with user-specific access controls.

## Environment Variables

Required environment variables:

```bash
# Database
DATABASE_URL="postgresql://..."

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key"
```

## Database Schema

The API uses the following main tables:

- `users`: User accounts
- `resumes`: Uploaded resume files and content
- `job_posts`: Job posting content and extracted keywords
- `applications`: Job application tracking
- `optimizations`: Resume optimization history

See `prisma/schema.prisma` for the complete database schema.

## Development Setup

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

3. Set up database:

```bash
npx prisma migrate dev
npx prisma generate
```

4. Run development server:

```bash
pnpm dev
```

## Production Deployment

1. Set up production database
2. Configure environment variables
3. Run database migrations:

```bash
npx prisma migrate deploy
```

4. Deploy to your hosting platform

## Support

For API support or questions, please contact the development team or create an issue in the project repository.
