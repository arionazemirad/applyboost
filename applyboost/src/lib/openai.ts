import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface KeywordExtractionResult {
  keywords: string[];
  categories: Record<string, string[]>;
}

export interface OptimizationResult {
  scoreBefore: number;
  scoreAfter: number;
  addedKeywords: string[];
  optimizedText: string;
  suggestions: string[];
}

export async function extractKeywordsFromJobPost(
  jobContent: string
): Promise<KeywordExtractionResult> {
  try {
    const prompt = `
Extract relevant keywords from this job posting and categorize them. Return a JSON object with:
1. "keywords": array of all important keywords/phrases
2. "categories": object with categories like "technical_skills", "soft_skills", "requirements", "tools", etc.

Job Posting:
${jobContent}

Return only valid JSON, no additional text.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    try {
      const result = JSON.parse(content) as KeywordExtractionResult;
      return result;
    } catch {
      // Fallback: extract keywords manually if JSON parsing fails
      return {
        keywords: extractBasicKeywords(jobContent),
        categories: {
          general: extractBasicKeywords(jobContent),
        },
      };
    }
  } catch (error) {
    console.error("Error extracting keywords:", error);
    // Fallback to basic keyword extraction
    return {
      keywords: extractBasicKeywords(jobContent),
      categories: {
        general: extractBasicKeywords(jobContent),
      },
    };
  }
}

export async function optimizeResume(
  resumeContent: string,
  jobKeywords: string[],
  jobContent: string
): Promise<OptimizationResult> {
  try {
    const prompt = `
You are a professional resume optimizer. Given a resume and job posting keywords, optimize the resume to better match the job requirements.

Resume Content:
${resumeContent}

Job Keywords to incorporate:
${jobKeywords.join(", ")}

Job Posting Context:
${jobContent}

Tasks:
1. Calculate a match score (0-100) for the original resume
2. Optimize the resume by naturally incorporating relevant keywords
3. Calculate the new match score
4. List the keywords you added
5. Provide improvement suggestions

Return a JSON object with:
{
  "scoreBefore": number,
  "scoreAfter": number,
  "addedKeywords": string[],
  "optimizedText": "optimized resume text",
  "suggestions": string[]
}

Return only valid JSON, no additional text.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from OpenAI");
    }

    try {
      const result = JSON.parse(content) as OptimizationResult;
      return result;
    } catch {
      // Fallback optimization
      return createFallbackOptimization(resumeContent, jobKeywords);
    }
  } catch (error) {
    console.error("Error optimizing resume:", error);
    return createFallbackOptimization(resumeContent, jobKeywords);
  }
}

export async function calculateMatchScore(
  resumeContent: string,
  jobKeywords: string[]
): Promise<number> {
  try {
    const prompt = `
Calculate a match score (0-100) between this resume and the job requirements based on keyword presence, relevance, and context.

Resume:
${resumeContent}

Job Keywords:
${jobKeywords.join(", ")}

Consider:
- Keyword presence and frequency
- Context and relevance
- Skills alignment
- Experience match

Return only a number between 0-100.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 50,
    });

    const content = response.choices[0]?.message?.content?.trim();
    const score = parseInt(content || "0");

    return isNaN(score)
      ? calculateBasicMatchScore(resumeContent, jobKeywords)
      : Math.min(100, Math.max(0, score));
  } catch (error) {
    console.error("Error calculating match score:", error);
    return calculateBasicMatchScore(resumeContent, jobKeywords);
  }
}

// Fallback functions for when OpenAI is unavailable
function extractBasicKeywords(text: string): string[] {
  const commonKeywords = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "leadership",
    "teamwork",
    "communication",
    "problem solving",
    "agile",
    "scrum",
    "git",
    "docker",
    "aws",
    "cloud",
  ];

  const lowerText = text.toLowerCase();
  return commonKeywords.filter((keyword) =>
    lowerText.includes(keyword.toLowerCase())
  );
}

function calculateBasicMatchScore(
  resumeContent: string,
  jobKeywords: string[]
): number {
  const resumeLower = resumeContent.toLowerCase();
  const matchedKeywords = jobKeywords.filter((keyword) =>
    resumeLower.includes(keyword.toLowerCase())
  );

  return Math.round((matchedKeywords.length / jobKeywords.length) * 100);
}

function createFallbackOptimization(
  resumeContent: string,
  jobKeywords: string[]
): OptimizationResult {
  const scoreBefore = calculateBasicMatchScore(resumeContent, jobKeywords);
  const addedKeywords = jobKeywords.slice(0, 3); // Add first 3 keywords
  const optimizedText =
    resumeContent + "\n\nAdditional Skills: " + addedKeywords.join(", ");
  const scoreAfter = Math.min(100, scoreBefore + 15);

  return {
    scoreBefore,
    scoreAfter,
    addedKeywords,
    optimizedText,
    suggestions: [
      "Add more relevant keywords naturally throughout your resume",
      "Quantify your achievements with specific metrics",
      "Tailor your experience descriptions to match job requirements",
    ],
  };
}
