import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-cream-200 bg-cream-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-serif text-xl text-navy-950">Haven</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-ink-700">
            A considered marketplace for buying and selling residential property.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-sm text-ink-700" aria-label="Footer">
          <Link to="/" className="hover:text-navy-900">
            Home
          </Link>
          <Link to="/properties" className="hover:text-navy-900">
            Browse properties
          </Link>
          <Link to="/login" className="hover:text-navy-900">
            Sign in
          </Link>
        </nav>
      </div>
      <div className="border-t border-cream-200">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-ink-500 sm:px-6">
          © {year} Haven Estates. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
