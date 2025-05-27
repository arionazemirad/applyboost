# 🧪 API Testing Examples

This guide provides practical examples for testing all ApplyBoost.ai API endpoints using curl commands.

## 🔧 Prerequisites

1. **Development server running**: `pnpm dev`
2. **Environment variables configured**: See SETUP_GUIDE.md
3. **Database migrated**: Already completed ✅

## 🏥 Health Check

First, verify the API is working:

```bash
curl http://localhost:3000/api/health
```

Expected response:

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "version": "1.0.0",
    "services": {
      "database": "connected",
      "storage": "connected",
      "ai": "connected"
    }
  }
}
```

## 📄 Resume Management

### Upload Resume (Text Content)

For testing without actual files, you can create a resume with text content:

```bash
curl -X POST http://localhost:3000/api/resume/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@test-resume.txt"
```

Create a test file first:

```bash
echo "John Doe
Software Engineer
Experience: 5 years in React, Node.js, TypeScript
Skills: JavaScript, Python, AWS, Docker
Education: BS Computer Science" > test-resume.txt
```

### Get All Resumes

```bash
curl http://localhost:3000/api/resume/upload
```

### Get Resume Details

```bash
curl http://localhost:3000/api/resume/{resume-id}
```

## 💼 Job Posting Management

### Upload Job Posting (JSON)

```bash
curl -X POST http://localhost:3000/api/job/upload \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Frontend Developer",
    "company": "TechCorp Inc.",
    "content": "We are looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern web technologies. Must have experience with Node.js, AWS, and agile development practices. Strong communication skills required."
  }'
```

### Get All Job Posts

```bash
curl http://localhost:3000/api/job/upload
```

### Get Job Post Details

```bash
curl http://localhost:3000/api/job/{job-id}
```

## 🚀 Resume Optimization

### Optimize Resume

```bash
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "resumeId": "your-resume-id",
    "jobPostId": "your-job-post-id"
  }'
```

### Get Optimization History

```bash
curl http://localhost:3000/api/optimize
```

## 📊 Application Tracking

### Create Application

```bash
curl -X POST http://localhost:3000/api/applications/track \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "Senior Frontend Developer",
    "company": "TechCorp Inc.",
    "resumeId": "your-resume-id",
    "jobPostId": "your-job-post-id",
    "status": "Applied",
    "notes": "Applied through LinkedIn"
  }'
```

### Get Applications (with filters)

```bash
# Get all applications
curl http://localhost:3000/api/applications/track

# Get applications with pagination
curl "http://localhost:3000/api/applications/track?page=1&limit=5"

# Filter by status
curl "http://localhost:3000/api/applications/track?status=Applied"

# Search by company/job title
curl "http://localhost:3000/api/applications/track?search=TechCorp"
```

### Update Application Status

```bash
curl -X PATCH http://localhost:3000/api/applications/{application-id} \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Interview",
    "notes": "Phone interview scheduled for tomorrow"
  }'
```

### Delete Application

```bash
curl -X DELETE http://localhost:3000/api/applications/{application-id}
```

## 🔄 Complete Workflow Example

Here's a complete workflow to test the entire system:

### Step 1: Upload a Resume

```bash
# Create test resume
echo "Jane Smith
Full Stack Developer
5+ years experience with React, Node.js, TypeScript, Python
Skills: JavaScript, React, Node.js, TypeScript, Python, AWS, Docker, MongoDB
Experience: Built scalable web applications, microservices architecture
Education: MS Computer Science" > jane-resume.txt

# Upload resume
curl -X POST http://localhost:3000/api/resume/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@jane-resume.txt"
```

Save the returned `resume-id` from the response.

### Step 2: Upload a Job Posting

```bash
curl -X POST http://localhost:3000/api/job/upload \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Engineer",
    "company": "StartupXYZ",
    "content": "We are seeking a Full Stack Engineer with expertise in React, Node.js, TypeScript, and cloud technologies. Experience with AWS, Docker, and agile methodologies preferred. Must have 3+ years of experience building scalable web applications."
  }'
```

Save the returned `job-id` from the response.

### Step 3: Optimize Resume

```bash
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "resumeId": "your-resume-id-from-step-1",
    "jobPostId": "your-job-id-from-step-2"
  }'
```

### Step 4: Track Application

```bash
curl -X POST http://localhost:3000/api/applications/track \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "Full Stack Engineer",
    "company": "StartupXYZ",
    "resumeId": "your-resume-id-from-step-1",
    "jobPostId": "your-job-id-from-step-2",
    "status": "Applied",
    "notes": "Applied with optimized resume"
  }'
```

### Step 5: View Results

```bash
# Check optimization history
curl http://localhost:3000/api/optimize

# Check applications
curl http://localhost:3000/api/applications/track
```

## 🐛 Error Testing

### Test Invalid Data

```bash
# Invalid resume ID format
curl -X POST http://localhost:3000/api/optimize \
  -H "Content-Type: application/json" \
  -d '{
    "resumeId": "invalid-id",
    "jobPostId": "also-invalid"
  }'

# Missing required fields
curl -X POST http://localhost:3000/api/applications/track \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "Test Job"
  }'
```

### Test Non-existent Resources

```bash
# Non-existent resume
curl http://localhost:3000/api/resume/non-existent-id

# Non-existent application
curl http://localhost:3000/api/applications/non-existent-id
```

## 📝 Response Examples

### Successful Resume Upload

```json
{
  "success": true,
  "data": {
    "id": "cm123abc456",
    "filename": "jane-resume.txt",
    "fileUrl": "https://storage.url/resumes/user123/file456.txt",
    "uploadedAt": "2024-01-15T10:30:00Z",
    "contentPreview": "Jane Smith Full Stack Developer 5+ years experience..."
  }
}
```

### Successful Optimization

```json
{
  "success": true,
  "data": {
    "optimizationId": "opt123",
    "scoreBefore": 75,
    "scoreAfter": 92,
    "improvement": 17,
    "addedKeywords": ["React", "TypeScript", "AWS", "Docker"],
    "optimizedText": "Enhanced resume content...",
    "suggestions": [
      "Add more quantifiable achievements",
      "Include specific technologies mentioned in job posting"
    ],
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Resume not found",
    "code": "NOT_FOUND",
    "details": null
  }
}
```

## 🔍 Debugging Tips

1. **Check server logs** in your terminal running `pnpm dev`
2. **Verify environment variables** are set correctly
3. **Check database connection** with `npx prisma studio`
4. **Test with simple data first** before complex scenarios
5. **Use the health endpoint** to verify API status

## 🚀 Next Steps

Once basic testing is working:

1. **Set up authentication** in Supabase
2. **Test with real PDF/DOCX files**
3. **Configure OpenAI API** for actual AI processing
4. **Set up file storage** in Supabase Storage
5. **Test the dashboard UI** with real data

## 📞 Support

If you encounter issues:

- Check the console logs for detailed error messages
- Verify all environment variables are configured
- Ensure the database is accessible
- Review the API documentation for correct request formats
