# 🚀 ApplyBoost.ai Setup Guide

## ⚠️ Current Issue: Missing Environment Variables

The error you're seeing is because the Supabase environment variables are not configured. Here's how to fix it:

## 1. Create Environment File

Create a `.env.local` file in your project root with the following content:

```bash
# Database (already configured)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.itxgmaagcghlwbxlnjoq.supabase.co:5432/postgres"

# Supabase Configuration
SUPABASE_URL="https://itxgmaagcghlwbxlnjoq.supabase.co"
SUPABASE_ANON_KEY="your-anon-key-here"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# OpenAI Configuration
OPENAI_API_KEY="sk-your-openai-api-key-here"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-here"
```

## 2. Get Your Supabase Keys

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy the following values:
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`
   - **service_role secret** key → `SUPABASE_SERVICE_ROLE_KEY`

## 3. Set Up Supabase Storage

1. In your Supabase dashboard, go to **Storage**
2. Create a new bucket named `resumes`
3. Set the bucket to **Public** or configure appropriate policies for authenticated users

## 4. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy it to `OPENAI_API_KEY`

## 5. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output to `NEXTAUTH_SECRET`

## 6. Restart Development Server

After setting up the environment variables:

```bash
pnpm dev
```

## ✅ Database Status

✅ **Database Schema**: Already created and migrated
✅ **Prisma Client**: Generated and ready
✅ **Tables Created**:

- users
- resumes
- job_posts
- applications
- optimizations

## 🧪 Test the Setup

Once environment variables are configured, test the API:

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

## 🔧 Troubleshooting

### If you still get Supabase errors:

1. Double-check your Supabase URL and keys
2. Ensure the `.env.local` file is in the project root
3. Restart the development server

### If you get database errors:

1. Verify your DATABASE_URL is correct
2. Check if your Supabase database is accessible

### If you get OpenAI errors:

1. Verify your OpenAI API key is valid
2. Check your OpenAI account has credits

## 📚 Next Steps

Once everything is working:

1. **Test the API endpoints** using the provided documentation
2. **Set up authentication** in your Supabase project
3. **Configure storage policies** for the resumes bucket
4. **Start building your frontend** to interact with the API

## 🆘 Need Help?

If you encounter any issues:

1. Check the console for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure your Supabase project is active and accessible
