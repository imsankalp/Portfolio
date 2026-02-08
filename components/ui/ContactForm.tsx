'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { ContactFormData, FormErrors } from '@/lib/types';
import { validateContactForm, validateField, hasFormErrors } from '@/lib/validation';
import { sendEmailWithRetry, isEmailJsConfigured } from '@/lib/emailjs';
import { fadeInUp } from '@/lib/animations';

/**
 * ContactForm Component
 * 
 * Email contact form with EmailJS integration.
 * Features:
 * - Controlled form with React state
 * - Client-side validation on blur and submit
 * - Inline error messages
 * - Loading state during submission
 * - Success/error notifications
 * - Form reset after successful submission
 * - ARIA labels and live regions
 * - Full keyboard accessibility
 * 
 * @param emailJsServiceId - EmailJS service ID
 * @param emailJsTemplateId - EmailJS template ID
 * @param emailJsPublicKey - EmailJS public key
 */
export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    meetingRequest: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle field blur (validate on blur)
  const handleBlur = (fieldName: keyof ContactFormData) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));

    const error = validateField(fieldName, formData[fieldName]);
    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setSubmitMessage('');

    // Validate all fields
    const validationErrors = validateContactForm(formData);
    setErrors(validationErrors);

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Stop if there are validation errors
    if (hasFormErrors(validationErrors)) {
      setSubmitStatus('error');
      setSubmitMessage('Please fix the errors above');
      return;
    }

    // Check if EmailJS is configured
    if (!isEmailJsConfigured()) {
      setSubmitStatus('error');
      setSubmitMessage('Email service is not configured. Please contact the administrator.');
      return;
    }

    // Submit form
    setIsSubmitting(true);

    try {
      await sendEmailWithRetry(formData);
      
      setSubmitStatus('success');
      setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        meetingRequest: false,
      });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="Contact form"
      noValidate
    >
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Name <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
          required
          aria-required="true"
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
          className={`w-full px-4 py-3 rounded-lg border ${
            touched.name && errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
          placeholder="Your name"
        />
        {touched.name && errors.name && (
          <p id="name-error" role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Email <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={() => handleBlur('email')}
          required
          aria-required="true"
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
          className={`w-full px-4 py-3 rounded-lg border ${
            touched.email && errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
          placeholder="your.email@example.com"
        />
        {touched.email && errors.email && (
          <p id="email-error" role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Subject <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={() => handleBlur('subject')}
          required
          aria-required="true"
          aria-invalid={touched.subject && !!errors.subject}
          aria-describedby={touched.subject && errors.subject ? 'subject-error' : undefined}
          className={`w-full px-4 py-3 rounded-lg border ${
            touched.subject && errors.subject
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors`}
          placeholder="What's this about?"
        />
        {touched.subject && errors.subject && (
          <p id="subject-error" role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Message <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={() => handleBlur('message')}
          required
          aria-required="true"
          aria-invalid={touched.message && !!errors.message}
          aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
          rows={6}
          className={`w-full px-4 py-3 rounded-lg border ${
            touched.message && errors.message
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors resize-none`}
          placeholder="Your message..."
        />
        {touched.message && errors.message && (
          <p id="message-error" role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Meeting Request Checkbox */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id="meetingRequest"
          name="meetingRequest"
          checked={formData.meetingRequest}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-2"
        />
        <label
          htmlFor="meetingRequest"
          className="ml-3 text-sm text-gray-700 dark:text-gray-300"
        >
          I'd like to schedule a meeting
        </label>
      </div>

      {/* Submit Status Messages */}
      {submitStatus === 'success' && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200"
        >
          <CheckCircle2 className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <p>{submitMessage}</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200"
        >
          <AlertCircle className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <p>{submitMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </motion.form>
  );
}
