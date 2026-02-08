import type { ContactFormData } from './types';

/**
 * EmailJS Configuration
 * 
 * Configuration for EmailJS service.
 * Requires environment variables to be set.
 */
export const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
};

/**
 * Check if EmailJS is configured
 */
export function isEmailJsConfigured(): boolean {
  return !!(
    emailJsConfig.serviceId &&
    emailJsConfig.templateId &&
    emailJsConfig.publicKey
  );
}

/**
 * Send Email
 * 
 * Sends an email using EmailJS service.
 * 
 * @param formData - Contact form data
 * @returns Promise<boolean> - True if email sent successfully
 */
export async function sendEmail(formData: ContactFormData): Promise<boolean> {
  if (!isEmailJsConfigured()) {
    console.error('EmailJS is not configured. Please set environment variables.');
    throw new Error('EmailJS is not configured');
  }

  // Dynamic import to avoid SSR issues
  const emailjs = (await import('@emailjs/browser')).default;

  try {
    const response = await emailjs.send(
      emailJsConfig.serviceId,
      emailJsConfig.templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        meeting_request: formData.meetingRequest ? 'Yes' : 'No',
      },
      emailJsConfig.publicKey
    );

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('EmailJS error:', error);
    throw error;
  }
}

/**
 * Send Email with Retry
 * 
 * Sends an email with retry logic for failed submissions.
 * 
 * @param formData - Contact form data
 * @param maxRetries - Maximum number of retry attempts (default: 2)
 * @returns Promise<boolean> - True if email sent successfully
 */
export async function sendEmailWithRetry(
  formData: ContactFormData,
  maxRetries: number = 2
): Promise<boolean> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const success = await sendEmail(formData);
      if (success) {
        return true;
      }
    } catch (error) {
      lastError = error as Error;
      console.error(`Email send attempt ${attempt + 1} failed:`, error);
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }

  // All attempts failed
  throw lastError || new Error('Failed to send email after multiple attempts');
}
