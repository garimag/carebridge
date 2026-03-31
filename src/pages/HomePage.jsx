import { RoleButton } from "../components/RoleButton";
import { SectionCard } from "../components/SectionCard";

export function HomePage({ setView, setRole }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Affordable shared living with support and dignity
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            CareBridge connects older adults who have available housing and need
            light support with younger people who need affordable housing and
            can help.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setView("profile")}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.01]"
            >
              Build a Profile
            </button>

            <button
              onClick={() => setView("matches")}
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:scale-[1.01]"
            >
              View Match Demo
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <SectionCard
            title="How it works"
            subtitle="Users share their needs, availability, and preferences. The app suggests compatible matches and helps both sides clarify expectations."
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                1. Create a profile
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                2. Review match score
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm">
                3. Build an agreement
              </div>
            </div>
          </SectionCard>

          <div className="grid gap-4 sm:grid-cols-2">
            <SectionCard
              title="For Hosts"
              subtitle="Older adults with available space who need companionship or light support."
            >
              <button
                onClick={() => {
                  setRole("host");
                  setView("profile");
                }}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200"
              >
                Start as Host
              </button>
            </SectionCard>

            <SectionCard
              title="For Seekers"
              subtitle="Students or young adults who need housing and can contribute time and care."
            >
              <button
                onClick={() => {
                  setRole("seeker");
                  setView("profile");
                }}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200"
              >
                Start as Seeker
              </button>
            </SectionCard>
          </div>
        </div>
      </div>
    </section>
  );
}