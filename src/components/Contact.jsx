import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useForm } from '../hooks/useForm';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { darkMode } = useTheme();
  const initialState = { name: '', email: '', subject: '', message: '' };
  const { 
    values, 
    errors, 
    handleChange, 
    handleSubmit, 
    isSubmitting, 
    submitSuccess 
  } = useForm(initialState);
  
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  useEffect(() => {
    // Initialize EmailJS with your user ID
    emailjs.init('nGLL7K9xsZhBoUVls');
  }, []);
  
  useEffect(() => {
    if (submitSuccess) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);
  
  return (
    <section id="contact" className={`py-16 px-4 relative ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/80 text-white' : 'bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800'}`}>
      {/* Success Popup */}
      {showSuccessMessage && (
        <div 
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-500 animate-fade-in-down
            ${darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}
        >
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p>Message sent successfully! I'll get back to you soon.</p>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a question or want to work together? Feel free to reach out to me using the form below or through my social media channels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Contact Form - Takes 3 columns on md screens */}
          <div className="md:col-span-3">
            <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} transition-all duration-300 hover:shadow-xl`}>
              <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium text-sm">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={values.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                    />
                    {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium text-sm">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={values.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                    />
                    {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium text-sm">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={values.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-sm">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Your message here..."
                    value={values.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-red-500 text-xs">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} 
                    text-white transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact Info - Takes 2 columns on md screens */}
          <div className="md:col-span-2">
            <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} h-full transition-all duration-300 hover:shadow-xl`}>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-blue-100'} mr-4`}>
                    <svg className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href="mailto:fariziadam508@gmail.com" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
                      fariziadam508@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-green-100'} mr-4`}>
                    <svg className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <a href="tel:+6285156400833" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'} transition-colors`}>
                      +62-851-5640-0833
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-red-100'} mr-4`}>
                    <svg className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Jakarta, Indonesia
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Connect With Me</h3>
              <div className="flex space-x-3">
                <a 
                  href="https://github.com/fariziadam11" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} 
                    transition-all duration-300 transform hover:-translate-y-1`}
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/fariziadam/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} 
                    transition-all duration-300 transform hover:-translate-y-1`}
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/friziadm/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} 
                    transition-all duration-300 transform hover:-translate-y-1`}
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;