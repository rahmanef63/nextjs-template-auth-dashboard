import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const phoneSchema = z.string()
  .regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number');

export const urlSchema = z.string().url('Invalid URL');

export const dateSchema = z.date()
  .min(new Date('1900-01-01'), 'Date is too old')
  .max(new Date('2100-01-01'), 'Date is too far in the future');