import { useEffect, useRef } from "react";

// One shared IntersectionObserver for every reveal on the page (no animation library).
let observer;
function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          observer.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  return observer;
}

export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const obs = getObserver();
    if (!el) return;
    if (!obs) {
      el.classList.add("is-visible");
      return;
    }
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ...style, "--delay": `${delay}s` }} {...rest}>
      {children}
    </Tag>
  );
}
