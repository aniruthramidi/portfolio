import React from 'react';

/**
 * Accessible Skip to Main Content Link
 * Visible only on keyboard focus, allowing keyboard and screen reader users
 * to bypass navigation directly to primary content.
 */
export default function SkipToContent({ targetId = 'main-content' }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-3 focus:bg-ink focus:text-paper focus:font-mono focus:text-xs focus:font-bold focus:tracking-wider focus:uppercase focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 transition-all"
    >
      Skip to main content &darr;
    </a>
  );
}
