'use client';

import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-beast-black px-6 text-center">
      <h1 className="font-sans font-black uppercase text-beast-white text-[3rem] leading-none">
        Something went wrong
      </h1>
      <p className="mt-4 text-beast-cream/60 text-base max-w-md">
        We could not load the page content. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-beast-teal px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-beast-white transition-opacity hover:opacity-85"
      >
        Try again
      </button>
    </div>
  );
}
