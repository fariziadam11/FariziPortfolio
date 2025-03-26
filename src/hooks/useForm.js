// src/hooks/useForm.js
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Message validation
    if (!values.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Replace with your actual EmailJS service details
        const result = await emailjs.send(
          'service_knjl3vk', // Replace with your EmailJS service ID
          'template_48jzft2', // Replace with your EmailJS template ID
          {
            from_name: values.name,
            from_email: values.email,
            message: values.message
          },
          'nGLL7K9xsZhBoUVls' // Replace with your EmailJS public key
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
        // Optionally, set an error state to show error message
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitSuccess
  };
};