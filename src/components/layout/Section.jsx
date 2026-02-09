export default function Section({ children, id, className = "" }) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 scroll-mt-24 md:scroll-mt-28 ${className}`}
    >
      {children}
    </section>
  );
}
