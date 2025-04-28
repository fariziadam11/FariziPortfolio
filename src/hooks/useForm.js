import { useState, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import * as Yup from 'yup';

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters')
      .max(500, 'Message must not exceed 500 characters')
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  }, [errors]);

  const validateForm = useCallback(async () => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const errorObj = {};
      err.inner.forEach(error => {
        errorObj[error.path] = error.message;
      });
      setErrors(errorObj);
      return false;
    }
  }, [values, validationSchema]); // Tambahkan validationSchema di sini
  

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    const isValid = await validateForm();
    if (!isValid) return;

    setIsSubmitting(true);
    
    try {
      const result = await emailjs.send(
        'service_knjl3vk',
        'template_izz2jem',
        {
          from_name: values.name,
          from_email: values.email,
          message: values.message
        },
        'nGLL7K9xsZhBoUVls'
      );

      console.log('Email sent successfully', result.text);
      
      // Reset form and show success message
      setValues(initialState);
      setSubmitSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to send email', error);
      setSubmitError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [values, initialState, validateForm]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitSuccess,
    submitError
  };
};