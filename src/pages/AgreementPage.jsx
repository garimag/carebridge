import { CheckboxPill } from "../components/CheckboxPill";
import { Input } from "../components/Input";
import { SectionCard } from "../components/SectionCard";
import { supportOptions } from "../data/options";

function textInputClass() {
  return "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400";
}

export function AgreementPage({
  agreement,
  setAgreement,
  selectedMatch,
  role,
}) {
  const match = selectedMatch?.data;

  const toggleTask = (task) => {
    const exists = agreement.supportTasks.includes(task);

    setAgreement({
      ...agreement,
      supportTasks: exists
        ? agreement.supportTasks.filter((item) => item !== task)
        : [...agreement.supportTasks, task],
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <SectionCard
          title="Agreement builder"
          subtitle="Turn a possible match into a clearer living-support plan."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-700">
                Private room included
              </div>
              <button
                type="button"
                onClick={() =>
                  setAgreement({
                    ...agreement,
                    privateRoom: !agreement.privateRoom,
                  })
                }
                className={`mt-3 rounded-full px-4 py-2 text-sm font-semibold ${
                  agreement.privateRoom
                    ? "bg-slate-900 text-white"
                    : "bg-white ring-1 ring-slate-300"
                }`}
              >
                {agreement.privateRoom ? "Yes" : "No"}
              </button>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-700">
                Wi-Fi included
              </div>
              <button
                type="button"
                onClick={() =>
                  setAgreement({
                    ...agreement,
                    wifiIncluded: !agreement.wifiIncluded,
                  })
                }
                className={`mt-3 rounded-full px-4 py-2 text-sm font-semibold ${
                  agreement.wifiIncluded
                    ? "bg-slate-900 text-white"
                    : "bg-white ring-1 ring-slate-300"
                }`}
              >
                {agreement.wifiIncluded ? "Yes" : "No"}
              </button>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="text-sm font-medium text-slate-700">
                Kitchen access
              </div>
              <button
                type="button"
                onClick={() =>
                  setAgreement({
                    ...agreement,
                    kitchenAccess: !agreement.kitchenAccess,
                  })
                }
                className={`mt-3 rounded-full px-4 py-2 text-sm font-semibold ${
                  agreement.kitchenAccess
                    ? "bg-slate-900 text-white"
                    : "bg-white ring-1 ring-slate-300"
                }`}
              >
                {agreement.kitchenAccess ? "Yes" : "No"}
              </button>
            </div>

            <Input label="Support hours per week">
              <input
                className={textInputClass()}
                type="number"
                min="1"
                max="40"
                value={agreement.weeklyHours}
                onChange={(e) =>
                  setAgreement({
                    ...agreement,
                    weeklyHours: Number(e.target.value),
                  })
                }
              />
            </Input>
          </div>

          <div className="mt-5">
            <div className="mb-2 text-sm font-medium text-slate-700">
              Support tasks
            </div>
            <div className="flex flex-wrap gap-2">
              {supportOptions.map((task) => (
                <CheckboxPill
                  key={task}
                  checked={agreement.supportTasks.includes(task)}
                  label={task}
                  onClick={() => toggleTask(task)}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Input label="Quiet hours">
              <select
                className={textInputClass()}
                value={agreement.quietHours}
                onChange={(e) =>
                  setAgreement({
                    ...agreement,
                    quietHours: e.target.value,
                  })
                }
              >
                <option>9 PM – 6 AM</option>
                <option>10 PM – 7 AM</option>
                <option>11 PM – 7 AM</option>
              </select>
            </Input>

            <Input label="Guest policy">
              <select
                className={textInputClass()}
                value={agreement.guests}
                onChange={(e) =>
                  setAgreement({
                    ...agreement,
                    guests: e.target.value,
                  })
                }
              >
                <option>Discuss in advance</option>
                <option>No overnight guests</option>
                <option>Flexible with notice</option>
              </select>
            </Input>
          </div>

          <div className="mt-5">
            <Input label="Check-in frequency">
              <select
                className={textInputClass()}
                value={agreement.checkIn}
                onChange={(e) =>
                  setAgreement({
                    ...agreement,
                    checkIn: e.target.value,
                  })
                }
              >
                <option>Weekly</option>
                <option>Twice a week</option>
                <option>Daily short check-in</option>
              </select>
            </Input>
          </div>
        </SectionCard>

        <div className="space-y-6">
          <SectionCard
            title="Live agreement summary"
            subtitle="This updates based on the choices above."
          >
            <div className="mb-4 text-sm text-slate-500">
              Agreement with{" "}
              <span className="font-semibold">
                {match?.name || "selected match"}
              </span>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="font-semibold">Housing offered:</span>{" "}
                {role === "seeker"
                  ? match?.privateRoom
                    ? "Private room"
                    : "Shared space"
                  : agreement.privateRoom
                  ? "Private room"
                  : "Shared space"}
                , {agreement.kitchenAccess ? "kitchen access included" : "limited kitchen access"}
                , {agreement.wifiIncluded ? " Wi-Fi included." : " Wi-Fi not included."}
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="font-semibold">Support expected:</span>{" "}
                {role === "seeker"
                  ? `${match?.hoursNeeded || agreement.weeklyHours} hours/week`
                  : `${agreement.weeklyHours} hours/week`}{" "}
                for{" "}
                {agreement.supportTasks.length > 0
                  ? agreement.supportTasks.join(", ")
                  : "light support to be decided"}.
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="font-semibold">Shared expectations:</span>{" "}
                Quiet hours are {agreement.quietHours}. Guests policy:{" "}
                {agreement.guests}. Check-ins: {agreement.checkIn}.
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Safety checklist"
            subtitle="This helps the project feel responsible and realistic."
          >
            <ul className="space-y-3 text-sm text-slate-700">
              <li>• Meet in a public place first</li>
              <li>• Confirm support tasks are light, not medical care</li>
              <li>• Discuss boundaries, privacy, and guests</li>
              <li>• Verify identity and references in a real deployment</li>
              <li>• Create a backup plan if the arrangement does not work out</li>
            </ul>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}