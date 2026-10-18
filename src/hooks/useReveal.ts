import { useCallback, useRef, type RefCallback } from 'react';

/**
 * Returns a ref callback that adds `data-revealed` to the element when it
 * enters the viewport (IntersectionObserver, threshold 0.15).
 *
 * If the user prefers reduced motion, the attribute is set immediately
 * without waiting for intersection.
 *
 * Usage:
 *   const revealRef = useReveal();
 *   <section ref={revealRef} data-reveal> ... </section>
 */
export function useReveal(): RefCallback<Element> {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const refCallback: RefCallback<Element> = useCallback((element: Element | null) => {
    // Clean up previous observer when ref changes
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!element) return;

    // Respect reduced-motion preference: reveal immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      element.setAttribute('data-revealed', '');
      return;
    }

    // Observe with IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', '');
            // Stop observing once revealed
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observerRef.current.observe(element);
  }, []);

  return refCallback;
}
