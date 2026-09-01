// Highlight the current section's nav link while scrolling.
const sections = document.querySelectorAll("main .section, .contact");
const navLinks = document.querySelectorAll(".nav-links a");

const setActive = (id) => {
  navLinks.forEach((link) => {
    const match = link.getAttribute("href") === `#${id}`;
    link.style.color = match ? "var(--amber)" : "";
  });
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  sections.forEach((section) => observer.observe(section));
}
