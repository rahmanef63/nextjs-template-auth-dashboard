import { useState, useCallback } from 'react';
import { formValidation } from '@/utils/form-validation';

type FormConfig = {
  initialValues: { [key: string]: any };
  validationRules?: { [key: string]: any };
  onSubmit: (values: { [key: string]: any }) => void;
};

export function useForm({ initialValues, validationRules = {}, onSubmit }: FormConfig) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const validationErrors = formValidation.validate(values, validationRules);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    } else {
      setErrors(validationErrors);
    }
    
    setIsSubmitting(false);
  }, [values, validationRules, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset
  };
}