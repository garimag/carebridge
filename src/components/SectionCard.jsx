export function SectionCard({ title, subtitle, children }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
      ) : null}
      <div className="mt-5">{children}</div>
    </div>
  );
}