export default function FooterDash({
  company = "GYMGEM",
  links = [
    { label: "Docs", href: "#" },
    { label: "Support", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
  className = "",
}) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`border-t border-border bg-muted/40 text-muted-foreground ${className}`}
      role="contentinfo"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm">
          © {year} {company}. All rights reserved.
        </p>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-4 text-sm"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="transition hover:text-foreground underline-offset-4 hover:underline focus:outline-none focus-visible:ring"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
