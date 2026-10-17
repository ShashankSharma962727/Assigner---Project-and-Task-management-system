import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  [
    "rounded-sm px-1 py-1 text-sm tracking-wide transition-colors",
    isActive
      ? "text-amber-500"
      : "text-cream-50/80 hover:text-cream-50",
  ].join(" ");

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-navy-800 bg-navy-950 text-cream-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-tight">Haven</span>
          <span className="hidden text-[0.65rem] tracking-[0.2em] text-amber-500 uppercase sm:inline">
            Estates
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/properties" className={navLinkClass}>
            Browse
          </NavLink>
          <NavLink to="/dashboard/properties/new" className={navLinkClass}>
            List a property
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <NavLink
            to="/login"
            className="px-2 py-1 text-sm text-cream-50/80 hover:text-cream-50"
          >
            Sign in
          </NavLink>
          <NavLink
            to="/register"
            className="border border-amber-500 px-3 py-1.5 text-sm text-amber-500 hover:bg-amber-500 hover:text-navy-950"
          >
            Register
          </NavLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center border border-navy-700 text-cream-50 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-5 bg-cream-50" />
            <span className="block h-px w-5 bg-cream-50" />
            <span className="block h-px w-5 bg-cream-50" />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-3 border-t border-navy-800 px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <NavLink to="/" end className={navLinkClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/properties"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Browse
          </NavLink>
          <NavLink
            to="/dashboard/properties/new"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            List a property
          </NavLink>
          <NavLink to="/login" className={navLinkClass} onClick={() => setOpen(false)}>
            Sign in
          </NavLink>
          <NavLink
            to="/register"
            className={navLinkClass}
            onClick={() => setOpen(false)}
          >
            Register
          </NavLink>
        </nav>
      ) : null}
    </header>
  );
};

export default Navbar;
