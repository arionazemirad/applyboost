# ApplyBoost.ai - Resume Optimization SaaS

A comprehensive resume optimization platform that uses AI to match resumes with job postings, extract keywords, and provide optimization suggestions.

## 🚀 Features

- **Resume Upload & Processing**: Upload PDF/DOCX resumes with automatic text extraction
- **Job Posting Analysis**: Extract keywords and requirements from job descriptions
- **AI-Powered Optimization**: Use OpenAI to optimize resumes for specific job postings
- **Match Scoring**: Calculate compatibility scores between resumes and job requirements
- **Application Tracking**: Track job applications with status management
- **Keyword Enhancement**: Suggest and add relevant keywords to improve match scores
- **Optimization History**: Track all optimizations with before/after comparisons

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for resume files)
- **AI**: OpenAI GPT-4o-mini for keyword extraction and optimization
- **Validation**: Zod for input validation
- **File Processing**: pdf-parse (PDF), mammoth (DOCX)
- **Styling**: Tailwind CSS with shadcn/ui components

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── resume/
│   │   │   ├── upload/         # Resume upload endpoint
│   │   │   └── [id]/           # Individual resume operations
│   │   ├── job/
│   │   │   ├── upload/         # Job posting upload endpoint
│   │   │   └── [id]/           # Individual job post operations
│   │   ├── optimize/           # Resume optimization endpoint
│   │   ├── applications/
│   │   │   ├── track/          # Application tracking
│   │   │   └── [id]/           # Individual application operations
│   │   └── health/             # Health check endpoint
│   ├── dashboard/              # Dashboard UI components
│   └── globals.css
├── lib/
│   ├── prisma.ts              # Prisma client configuration
│   ├── supabase.ts            # Supabase client configuration
│   ├── auth.ts                # Authentication utilities
│   ├── openai.ts              # OpenAI integration
│   ├── file-processing.ts     # File upload and text extraction
│   ├── validations.ts         # Zod validation schemas
│   └── api-utils.ts           # API utility functions
├── components/                 # UI components
└── middleware.ts              # Authentication middleware
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Supabase account
- OpenAI API key

### 1. Clone and Install

```bash
git clone <repository-url>
cd applyboost
pnpm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

Then set the following values:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/applyboost"

# Supabase Configuration
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# OpenAI Configuration
OPENAI_API_KEY="sk-your-openai-api-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 4. Supabase Storage Setup

Create a storage bucket named `resumes` in your Supabase project:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `resumes`
3. Set appropriate permissions for authenticated users

### 5. Run Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication

All API endpoints require authentication using Supabase JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <supabase-jwt-token>
```

### Core Endpoints

#### Resume Management

- `POST /api/resume/upload` - Upload resume file
- `GET /api/resume/upload` - Get user's resumes
- `GET /api/resume/{id}` - Get resume details
- `DELETE /api/resume/{id}` - Delete resume

#### Job Posting Management

- `POST /api/job/upload` - Upload job posting
- `GET /api/job/upload` - Get user's job posts
- `GET /api/job/{id}` - Get job post details
- `DELETE /api/job/{id}` - Delete job post

#### Resume Optimization

- `POST /api/optimize` - Optimize resume for job posting
- `GET /api/optimize` - Get optimization history

#### Application Tracking

- `POST /api/applications/track` - Create application
- `GET /api/applications/track` - Get applications (with pagination)
- `GET /api/applications/{id}` - Get application details
- `PATCH /api/applications/{id}` - Update application
- `DELETE /api/applications/{id}` - Delete application

#### Health Check

- `GET /api/health` - API health status

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 🗄 Database Schema

The application uses the following main models:

- **User**: User accounts and authentication
- **Resume**: Uploaded resume files and extracted content
- **JobPost**: Job postings with extracted keywords
- **Application**: Job application tracking
- **Optimization**: Resume optimization history

See `prisma/schema.prisma` for the complete schema definition.

## 🔒 Security Features

- **Authentication**: Supabase Auth with JWT tokens
- **Authorization**: User-scoped data access
- **File Validation**: Type and size validation for uploads
- **Input Validation**: Zod schemas for all API inputs
- **Error Handling**: Comprehensive error responses
- **Rate Limiting**: Built-in protection against abuse

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. The repo includes `vercel.json` which sets the root directory to `applyboost` and uses pnpm for builds.
3. Add the environment variables from `.env.example` in the Vercel dashboard.
4. Deploy automatically on push to the main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

### Production Checklist

- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Set up Supabase storage bucket
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging

## 🧪 Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run type checking
pnpm type-check
```

## 📈 Performance Considerations

- **File Processing**: Asynchronous text extraction with fallbacks
- **Database**: Optimized queries with proper indexing
- **Caching**: API responses cached where appropriate
- **Error Handling**: Graceful degradation for external services
- **Rate Limiting**: Prevents API abuse

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the [API Documentation](./API_DOCUMENTATION.md)
- Review the [troubleshooting guide](#troubleshooting)

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Issues**

   - Verify DATABASE_URL is correct
   - Ensure PostgreSQL is running
   - Check network connectivity

2. **Supabase Authentication Errors**

   - Verify SUPABASE_URL and keys are correct
   - Check Supabase project settings
   - Ensure storage bucket exists

3. **OpenAI API Errors**

   - Verify OPENAI_API_KEY is valid
   - Check API usage limits
   - Review OpenAI service status

4. **File Upload Issues**
   - Check file size limits (10MB max)
   - Verify supported file types (PDF, DOCX)
   - Ensure Supabase storage is configured

### Development Tips

- Use `npx prisma studio` to inspect database
- Check browser network tab for API errors
- Review server logs for detailed error messages
- Use `pnpm dev` for hot reloading during development
