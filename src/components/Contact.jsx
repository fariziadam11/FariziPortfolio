import React, { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useForm } from '../hooks/useForm';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { darkMode } = useTheme();
  const initialState = { name: '', email: '', message: '' };
  const { 
    values, 
    errors, 
    handleChange, 
    handleSubmit, 
    isSubmitting, 
    submitSuccess 
  } = useForm(initialState);
  
  useEffect(() => {
    // Initialize EmailJS with your user ID
    emailjs.init('nGLL7K9xsZhBoUVls'); // Replace with your EmailJS user ID
  }, []);
  
  return (
    <section id="contact" className="py-16 px-4 dark:bg-gray-900 dark:text-white relative">
      {/* Success Popup */}
      {submitSuccess && (
        <div 
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 
            ${darkMode ? 'bg-green-700 text-white' : 'bg-green-500 text-white'}`}
        >
          Message sent successfully! I'll get back to you soon.
        </div>
      )}

      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Get In Touch</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} 
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} 
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={values.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} 
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                ></textarea>
                {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} 
                  text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          <div className="md:w-1/2">
            <div className={`p-6 rounded-lg h-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} dark:bg-gray-800`}>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-xl mr-3">📧</span>
                  <p>fariziadam508@gmail.com</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">📱</span>
                  <p>+62-851-5640-0833</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xl mr-3">📍</span>
                  <p>Jakarta Indonesia</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-8 mb-4">Social Links</h3>
              <div className="flex space-x-4">
                <a href="https://github.com/fariziadam11" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-200'} 
                  dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md transition-colors`}>
                  <span className="text-xl">🐙</span>
                </a>
                <a href="https://www.linkedin.com/in/fariziadam/" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-200'} 
                  dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md transition-colors`}>
                  <span className="text-xl">💼</span>
                </a>
                <a href="https://www.instagram.com/friziadm/" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-200'} 
                  dark:bg-gray-700 dark:hover:bg-gray-600 shadow-md transition-colors`}>
                  <span className="text-xl">📸</span>
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