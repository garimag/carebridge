import { RoleButton } from "../components/RoleButton";
import { SectionCard } from "../components/SectionCard";
import { Input } from "../components/Input";
import { CheckboxPill } from "../components/CheckboxPill";
import { supportOptions, availabilityOptions } from "../data/options";

function textInputClass() {
  return "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-400";
}

export function ProfilePage({
  role,
  setRole,
  profile,
  setProfile,
  hostProfile,
  setHostProfile,
  toggleItem,
  toggleHostItem,
  setView,
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6 flex gap-3">
        <RoleButton active={role === "seeker"} onClick={() => setRole("seeker")}>
          I need housing
        </RoleButton>
        <RoleButton active={role === "host"} onClick={() => setRole("host")}>
          I have a room and need support
        </RoleButton>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <SectionCard
          title={role === "seeker" ? "Seeker profile" : "Host profile"}
          subtitle={
            role === "seeker"
              ? "Tell the app what housing and schedule fit you best."
              : "Tell the app what support you need and what kind of home you offer."
          }
        >
          {role === "seeker" ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Name">
                  <input
                    className={textInputClass()}
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Your name"
                  />
                </Input>

                <Input label="City">
                  <select
                    className={textInputClass()}
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  >
                    <option>San Jose</option>
                    <option>Santa Clara</option>
                    <option>Sunnyvale</option>
                  </select>
                </Input>

                <Input label="Age range">
                  <select
                    className={textInputClass()}
                    value={profile.ageRange}
                    onChange={(e) => setProfile({ ...profile, ageRange: e.target.value })}
                  >
                    <option>18–24</option>
                    <option>25–34</option>
                    <option>35–44</option>
                  </select>
                </Input>

                <Input label="Hours available each week">
                  <input
                    className={textInputClass()}
                    type="number"
                    min="1"
                    max="40"
                    value={profile.hoursAvailable}
                    onChange={(e) =>
                      setProfile({ ...profile, hoursAvailable: Number(e.target.value) })
                    }
                  />
                </Input>
              </div>

              <div className="mt-5">
                <div className="mb-2 text-sm font-medium text-slate-700">
                  Skills you can offer
                </div>
                <div className="flex flex-wrap gap-2">
                  {supportOptions.map((item) => (
                    <CheckboxPill
                      key={item}
                      checked={profile.skills.includes(item)}
                      label={item}
                      onClick={() => toggleItem("skills", item)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 text-sm font-medium text-slate-700">
                  Availability
                </div>
                <div className="flex flex-wrap gap-2">
                  {availabilityOptions.map((item) => (
                    <CheckboxPill
                      key={item}
                      checked={profile.schedule.includes(item)}
                      label={item}
                      onClick={() => toggleItem("schedule", item)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Input label="Language">
                  <select
                    className={textInputClass()}
                    value={profile.languages[0]}
                    onChange={(e) =>
                      setProfile({ ...profile, languages: [e.target.value] })
                    }
                  >
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </Input>

                <Input label="Home preference">
                  <select
                    className={textInputClass()}
                    value={profile.quietHome ? "Quiet" : "Flexible"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        quietHome: e.target.value === "Quiet",
                      })
                    }
                  >
                    <option>Quiet</option>
                    <option>Flexible</option>
                  </select>
                </Input>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="text-sm font-medium">Okay with pets</div>
                  <div className="text-sm text-slate-500">
                    Pet compatibility affects matches.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setProfile({ ...profile, okayWithPets: !profile.okayWithPets })
                  }
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    profile.okayWithPets
                      ? "bg-slate-900 text-white"
                      : "bg-white ring-1 ring-slate-300"
                  }`}
                >
                  {profile.okayWithPets ? "Yes" : "No"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Name">
                  <input
                    className={textInputClass()}
                    value={hostProfile.name}
                    onChange={(e) =>
                      setHostProfile({ ...hostProfile, name: e.target.value })
                    }
                    placeholder="Your name"
                  />
                </Input>

                <Input label="City">
                  <select
                    className={textInputClass()}
                    value={hostProfile.city}
                    onChange={(e) =>
                      setHostProfile({ ...hostProfile, city: e.target.value })
                    }
                  >
                    <option>San Jose</option>
                    <option>Santa Clara</option>
                    <option>Sunnyvale</option>
                  </select>
                </Input>

                <Input label="Age range">
                  <select
                    className={textInputClass()}
                    value={hostProfile.ageRange}
                    onChange={(e) =>
                      setHostProfile({ ...hostProfile, ageRange: e.target.value })
                    }
                  >
                    <option>60–69</option>
                    <option>70–79</option>
                    <option>80–89</option>
                  </select>
                </Input>

                <Input label="Hours of support needed each week">
                  <input
                    className={textInputClass()}
                    type="number"
                    min="1"
                    max="40"
                    value={hostProfile.hoursNeeded}
                    onChange={(e) =>
                      setHostProfile({
                        ...hostProfile,
                        hoursNeeded: Number(e.target.value),
                      })
                    }
                  />
                </Input>
              </div>

              <div className="mt-5">
                <div className="mb-2 text-sm font-medium text-slate-700">
                  Support needed
                </div>
                <div className="flex flex-wrap gap-2">
                  {supportOptions.map((item) => (
                    <CheckboxPill
                      key={item}
                      checked={hostProfile.supportNeeds.includes(item)}
                      label={item}
                      onClick={() => toggleHostItem("supportNeeds", item)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 text-sm font-medium text-slate-700">
                  Availability
                </div>
                <div className="flex flex-wrap gap-2">
                  {availabilityOptions.map((item) => (
                    <CheckboxPill
                      key={item}
                      checked={hostProfile.schedule.includes(item)}
                      label={item}
                      onClick={() => toggleHostItem("schedule", item)}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Input label="Language">
                  <select
                    className={textInputClass()}
                    value={hostProfile.languages[0]}
                    onChange={(e) =>
                      setHostProfile({ ...hostProfile, languages: [e.target.value] })
                    }
                  >
                    <option>English</option>
                    <option>Spanish</option>
                  </select>
                </Input>

                <Input label="Home style">
                  <select
                    className={textInputClass()}
                    value={hostProfile.quietHome ? "Quiet" : "Flexible"}
                    onChange={(e) =>
                      setHostProfile({
                        ...hostProfile,
                        quietHome: e.target.value === "Quiet",
                      })
                    }
                  >
                    <option>Quiet</option>
                    <option>Flexible</option>
                  </select>
                </Input>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div>
                    <div className="text-sm font-medium">Private room available</div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setHostProfile({
                        ...hostProfile,
                        privateRoom: !hostProfile.privateRoom,
                      })
                    }
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      hostProfile.privateRoom
                        ? "bg-slate-900 text-white"
                        : "bg-white ring-1 ring-slate-300"
                    }`}
                  >
                    {hostProfile.privateRoom ? "Yes" : "No"}
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div>
                    <div className="text-sm font-medium">Pets in home</div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setHostProfile({ ...hostProfile, pets: !hostProfile.pets })
                    }
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      hostProfile.pets
                        ? "bg-slate-900 text-white"
                        : "bg-white ring-1 ring-slate-300"
                    }`}
                  >
                    {hostProfile.pets ? "Yes" : "No"}
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setView("matches")}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
            >
              See my matches
            </button>
          </div>
        </SectionCard>

        <SectionCard
          title="Why this is an app"
          subtitle={
            role === "seeker"
              ? "The seeker enters housing preferences and support skills, and the app returns personalized matches."
              : "The host enters support needs and housing details, and the app can later match them with compatible seekers."
          }
        >
          <ul className="space-y-3 text-sm text-slate-700">
            <li>• Input: needs, skills, schedule, preferences</li>
            <li>• Logic: matching algorithm calculates compatibility</li>
            <li>• Output: scores, reasons, concerns, next actions</li>
          </ul>
        </SectionCard>
      </div>
    </section>
  );
}