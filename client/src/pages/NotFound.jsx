import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 sm:px-6 lg:py-28">
      <p className="text-xs font-medium tracking-[0.22em] text-amber-600 uppercase">
        404
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">This page is not listed.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-ink-700 sm:text-lg">
        The address you entered does not match a page on Haven. Check the URL or
        return to the marketplace.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/"
          className="bg-navy-950 px-4 py-2.5 text-sm text-cream-50 hover:bg-navy-800"
        >
          Back to home
        </Link>
        <Link
          to="/properties"
          className="border border-navy-900 px-4 py-2.5 text-sm text-navy-950 hover:bg-cream-100"
        >
          Browse properties
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
