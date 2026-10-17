const PagePlaceholder = ({ eyebrow, title, description }) => {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
      <p className="text-xs font-medium tracking-[0.22em] text-amber-600 uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-ink-700 sm:text-lg">
        {description}
      </p>
    </section>
  );
};

export default PagePlaceholder;
