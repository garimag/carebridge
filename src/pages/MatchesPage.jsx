import { SectionCard } from "../components/SectionCard";
import { explainMatch } from "../utils/explainMatch";

export function MatchesPage({
  matches,
  selectedMatchId,
  setSelectedMatchId,
  role,
  savedMatches,
  saveMatch,
  removeSavedMatch,
}) {
  const selected =
    matches.find((item) => item.data.id === selectedMatchId) || matches[0];

  const savedMatchItems = matches.filter((item) =>
    savedMatches.includes(item.data.id)
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <SectionCard
          title="Top matches"
          subtitle={
            role === "seeker"
              ? "These hosts are matched to your seeker profile."
              : "These seekers are matched to your host profile."
          }
        >
          <div className="space-y-4">
            {matches.map((match) => {
              const isSaved = savedMatches.includes(match.data.id);
              const isSelected = selected?.data.id === match.data.id;

              return (
                <div
                  key={match.data.id}
                  className={`rounded-2xl border p-4 transition ${
                    isSelected
                      ? "border-slate-900 bg-slate-50"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedMatchId(match.data.id)}
                      className="flex-1 text-left"
                    >
                      <div className="text-lg font-semibold">{match.data.name}</div>
                      <div className="mt-1 text-sm text-slate-500">
                        {match.data.city} · {match.data.ageRange}
                      </div>
                      <div className="mt-3 text-sm text-slate-700">
                        {match.data.summary}
                      </div>
                    </button>

                    <div className="flex flex-col items-end gap-2">
                      <div className="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
                        {match.score}%
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          isSaved
                            ? removeSavedMatch(match.data.id)
                            : saveMatch(match.data.id)
                        }
                        className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                          isSaved
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {isSaved ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard
            title="Selected match"
            subtitle="Explain not just the score, but why the score happened."
          >
            {selected ? (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-2xl font-semibold">{selected.data.name}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      {selected.data.city} ·{" "}
                      {role === "seeker"
                        ? `Private room: ${selected.data.privateRoom ? "Yes" : "No"}`
                        : `Hours available: ${selected.data.hoursAvailable}`}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-900 px-4 py-3 text-lg font-bold text-white">
                    {selected.score}% match
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Why this match works
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {selected.reasons.map((reason) => (
                        <li key={reason}>• {reason}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Things to clarify
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {(selected.concerns.length
                        ? selected.concerns
                        : ["No major concerns found in this demo match"]
                      ).map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="rounded-2xl bg-blue-50 p-4">
                        <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                        AI-style match explanation
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                        {explainMatch(selected, role)}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                        Suggested first step: schedule a short meeting, discuss
                        expectations, and confirm living arrangement details before
                        moving forward.
                    </div>
                    </div>
              </div>
            ) : (
              <div className="text-sm text-slate-500">No match selected yet.</div>
            )}
          </SectionCard>

          <SectionCard
            title="Saved matches"
            subtitle="Quickly return to people you want to review later."
          >
            {savedMatchItems.length > 0 ? (
              <div className="space-y-3">
                {savedMatchItems.map((match) => (
                  <div
                    key={match.data.id}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedMatchId(match.data.id)}
                      className="text-left"
                    >
                      <div className="font-semibold">{match.data.name}</div>
                      <div className="text-sm text-slate-500">
                        {match.data.city} · {match.score}% match
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => removeSavedMatch(match.data.id)}
                      className="rounded-full bg-white px-3 py-2 text-xs font-semibold ring-1 ring-slate-300 hover:bg-slate-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-slate-500">
                No saved matches yet. Save a match to review it later.
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </section>
  );
}