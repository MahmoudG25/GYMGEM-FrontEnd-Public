import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Visibility threshold (0-1, default: 0.1)
 * @param {string} options.rootMargin - Margin around root (default: "0px")
 * @returns {Object} { ref, isVisible }
 */
export const useScrollAnimation = (options = {}) => {
  const { threshold = 0.1, rootMargin = "0px" } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: stop observing after first visibility to save resources
          // observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};
