import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/**
 * A custom hook for optimizing performance in React components
 * Provides utilities for debouncing, throttling, and measuring render performance
 */
const usePerformanceOptimizer = () => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());
  const renderTimes = useRef([]);
  const [isPerformanceMonitoring, setIsPerformanceMonitoring] = useState(false);

  // Increment render count on each render
  useEffect(() => {
    renderCount.current += 1;
    
    const currentTime = performance.now();
    const timeSinceLastRender = currentTime - lastRenderTime.current;
    
    if (isPerformanceMonitoring) {
      renderTimes.current.push(timeSinceLastRender);
      // Keep only the last 10 render times
      if (renderTimes.current.length > 10) {
        renderTimes.current.shift();
      }
      
      // Log performance metrics in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`Component rendered in ${timeSinceLastRender.toFixed(2)}ms (render #${renderCount.current})`);
      }
    }
    
    lastRenderTime.current = currentTime;
  });

  /**
   * Creates a debounced version of a function
   * @param {Function} fn - The function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} - Debounced function
   */
  const debounce = useCallback((fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }, []);

  /**
   * Creates a throttled version of a function
   * @param {Function} fn - The function to throttle
   * @param {number} limit - Limit in milliseconds
   * @returns {Function} - Throttled function
   */
  const throttle = useCallback((fn, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }, []);

  /**
   * Optimizes image loading with lazy loading and proper sizing
   * @param {string} src - Image source
   * @param {Object} options - Options for image loading
   * @returns {Object} - Optimized image props
   */
  const optimizeImage = useCallback((src, options = {}) => {
    const defaultOptions = {
      loading: 'lazy',
      decoding: 'async',
      fetchPriority: 'low',
      ...options
    };

    return {
      src,
      ...defaultOptions
    };
  }, []);

  /**
   * Toggles performance monitoring
   */
  const togglePerformanceMonitoring = useCallback(() => {
    setIsPerformanceMonitoring(prev => !prev);
  }, []);

  /**
   * Gets performance metrics
   * @returns {Object} - Performance metrics
   */
  const getPerformanceMetrics = useCallback(() => {
    const avgRenderTime = renderTimes.current.length 
      ? renderTimes.current.reduce((sum, time) => sum + time, 0) / renderTimes.current.length
      : 0;

    return {
      renderCount: renderCount.current,
      averageRenderTime: avgRenderTime,
      lastRenderTime: renderTimes.current[renderTimes.current.length - 1] || 0,
      isMonitoring: isPerformanceMonitoring
    };
  }, [isPerformanceMonitoring]);

  return {
    debounce,
    throttle,
    optimizeImage,
    togglePerformanceMonitoring,
    getPerformanceMetrics
  };
};

export default usePerformanceOptimizer;
