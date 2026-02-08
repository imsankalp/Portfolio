import { ContactFormData, FormErrors } from './types';
import { formValidationRules } from './constants';

/**
 * Validate Name Field
 */
function validateName(name: string): string | undefined {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  
  if (name.trim().length < formValidationRules.name.minLength) {
    return `Name must be at least ${formValidationRules.name.minLength} characters`;
  }
  
  if (name.trim().length > formValidationRules.name.maxLength) {
    return `Name must be less than ${formValidationRules.name.maxLength} characters`;
  }
  
  return undefined;
}

/**
 * Validate Email Field
 */
function validateEmail(email: string): string | undefined {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  
  if (!formValidationRules.email.pattern.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return undefined;
}

/**
 * Validate Subject Field
 */
function validateSubject(subject: string): string | undefined {
  if (!subject || subject.trim().length === 0) {
    return 'Subject is required';
  }
  
  if (subject.trim().length < formValidationRules.subject.minLength) {
    return `Subject must be at least ${formValidationRules.subject.minLength} characters`;
  }
  
  if (subject.trim().length > formValidationRules.subject.maxLength) {
    return `Subject must be less than ${formValidationRules.subject.maxLength} characters`;
  }
  
  return undefined;
}

/**
 * Validate Message Field
 */
function validateMessage(message: string): string | undefined {
  if (!message || message.trim().length === 0) {
    return 'Message is required';
  }
  
  if (message.trim().length < formValidationRules.message.minLength) {
    return `Message must be at least ${formValidationRules.message.minLength} characters`;
  }
  
  if (message.trim().length > formValidationRules.message.maxLength) {
    return `Message must be less than ${formValidationRules.message.maxLength} characters`;
  }
  
  return undefined;
}

/**
 * Validate Contact Form
 * 
 * Validates all fields in the contact form.
 * Returns an object with error messages for each invalid field.
 * 
 * @param formData - Contact form data to validate
 * @returns FormErrors object with error messages
 */
export function validateContactForm(formData: Partial<ContactFormData>): FormErrors {
  const errors: FormErrors = {};
  
  // Validate name
  const nameError = validateName(formData.name || '');
  if (nameError) {
    errors.name = nameError;
  }
  
  // Validate email
  const emailError = validateEmail(formData.email || '');
  if (emailError) {
    errors.email = emailError;
  }
  
  // Validate subject
  const subjectError = validateSubject(formData.subject || '');
  if (subjectError) {
    errors.subject = subjectError;
  }
  
  // Validate message
  const messageError = validateMessage(formData.message || '');
  if (messageError) {
    errors.message = messageError;
  }
  
  return errors;
}

/**
 * Check if form has errors
 * 
 * @param errors - FormErrors object
 * @returns boolean - True if there are any errors
 */
export function hasFormErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Validate Single Field
 * 
 * Validates a single form field.
 * 
 * @param fieldName - Name of the field to validate
 * @param value - Value of the field
 * @returns Error message or undefined
 */
export function validateField(
  fieldName: keyof ContactFormData,
  value: string | boolean | undefined
): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }
  
  switch (fieldName) {
    case 'name':
      return validateName(value);
    case 'email':
      return validateEmail(value);
    case 'subject':
      return validateSubject(value);
    case 'message':
      return validateMessage(value);
    default:
      return undefined;
  }
}
