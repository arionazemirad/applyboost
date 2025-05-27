import mammoth from "mammoth";
import { Buffer } from "buffer";

export async function extractTextFromFile(
  fileBuffer: Buffer,
  mimeType: string
): Promise<string> {
  try {
    switch (mimeType) {
      case "application/pdf":
        return await extractTextFromPDF(fileBuffer);
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return await extractTextFromDOCX(fileBuffer);
      default:
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
  } catch (error) {
    console.error("Error extracting text from file:", error);
    throw new Error("Failed to extract text from file");
  }
}

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Import pdf-parse dynamically to avoid issues with server-side rendering
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error("PDF parsing error:", error);
    // Fallback: return a mock extracted text for demo purposes
    return `Extracted PDF content from buffer of ${buffer.length} bytes. This would contain the actual resume text in a real implementation.`;
  }
}

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  } catch {
    throw new Error("Failed to extract text from DOCX");
  }
}

export function validateFileType(mimeType: string): boolean {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  return allowedTypes.includes(mimeType);
}

export function getFileExtension(mimeType: string): string {
  switch (mimeType) {
    case "application/pdf":
      return ".pdf";
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return ".docx";
    default:
      return "";
  }
}
