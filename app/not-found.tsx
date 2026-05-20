import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-beast-black px-6 text-center">
      <p className="font-sans text-sm uppercase tracking-[0.2em] text-beast-cream/40">
        404
      </p>
      <h1 className="mt-4 font-sans font-black uppercase text-beast-white text-[3rem] leading-none md:text-[4.5rem]">
        Page not found
      </h1>
      <p className="mt-5 text-beast-cream/60 text-base max-w-md">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-beast-teal px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-beast-white transition-opacity hover:opacity-85"
      >
        Back to home
      </Link>
    </div>
  );
}
