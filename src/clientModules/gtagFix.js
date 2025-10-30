// Fix for gtag not being available on client-side navigation
// Create a safe wrapper for gtag that won't throw errors
if (typeof window !== 'undefined') {
  // Store the original gtag if it exists
  const originalGtag = window.gtag;

  // Create a safe wrapper
  window.gtag = function(...args) {
    // Only call if the original gtag function exists and is actually a function
    if (typeof originalGtag === 'function') {
      try {
        return originalGtag.apply(this, args);
      } catch (e) {
        // Silently ignore gtag errors
        console.debug('gtag error (ignored):', e);
      }
    } else if (window.dataLayer) {
      // If gtag doesn't exist but dataLayer does, push directly
      window.dataLayer.push(arguments);
    }
  };

  // Restore the original gtag once it's loaded
  const checkGtagLoaded = setInterval(() => {
    if (window.google_tag_manager || (window.gtag && window.gtag !== originalGtag)) {
      clearInterval(checkGtagLoaded);
    }
  }, 100);

  // Clear the interval after 10 seconds to prevent infinite checking
  setTimeout(() => clearInterval(checkGtagLoaded), 10000);
}

export function onRouteDidUpdate({location, previousLocation}) {
  // Don't execute if we are still on the same page; the lifecycle may be fired
  // because the hash changes (e.g. when navigating between headings)
  if (location.pathname === previousLocation?.pathname) {
    return;
  }

  // Safely call gtag for page view tracking
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search + location.hash,
        page_title: document.title,
      });
    } catch (e) {
      // Silently ignore errors
      console.debug('gtag page_view error (ignored):', e);
    }
  }
}
