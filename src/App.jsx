import { useMemo, useState } from "react";
import { hosts } from "./data/hosts";
import { seekers } from "./data/seekers";
import { scoreMatch, scoreHostToSeeker } from "./utils/scoreMatch";
import { RoleButton } from "./components/RoleButton";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { MatchesPage } from "./pages/MatchesPage";
import { AgreementPage } from "./pages/AgreementPage";

export default function App() {
  const [role, setRole] = useState("seeker");
  const [view, setView] = useState("home");
  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [savedMatches, setSavedMatches] = useState([]);

  const [profile, setProfile] = useState({
    name: "",
    city: "San Jose",
    ageRange: "18–24",
    skills: ["companionship"],
    schedule: ["Wed Evening"],
    languages: ["English"],
    okayWithPets: true,
    quietHome: true,
    hoursAvailable: 6,
  });

  const [hostProfile, setHostProfile] = useState({
    name: "",
    city: "San Jose",
    ageRange: "70–79",
    privateRoom: true,
    supportNeeds: ["companionship"],
    schedule: ["Wed Evening"],
    languages: ["English"],
    pets: false,
    quietHome: true,
    hoursNeeded: 6,
  });

  const [agreement, setAgreement] = useState({
    privateRoom: true,
    wifiIncluded: true,
    kitchenAccess: true,
    weeklyHours: 6,
    supportTasks: ["companionship", "meal prep"],
    quietHours: "10 PM – 7 AM",
    guests: "Discuss in advance",
    checkIn: "Weekly",
  });

  const toggleItem = (key, value) => {
    setProfile((prev) => {
      const current = prev[key];
      const exists = current.includes(value);

      return {
        ...prev,
        [key]: exists
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const toggleHostItem = (key, value) => {
    setHostProfile((prev) => {
      const current = prev[key];
      const exists = current.includes(value);

      return {
        ...prev,
        [key]: exists
          ? current.filter((item) => item !== value)
          : [...current, value],
      };
    });
  };

  const saveMatch = (matchId) => {
  setSavedMatches((prev) =>
    prev.includes(matchId) ? prev : [...prev, matchId]
  );
    };

    const removeSavedMatch = (matchId) => {
      setSavedMatches((prev) => prev.filter((id) => id !== matchId));
  };

  const matches = useMemo(() => {
    if (role === "seeker") {
      return hosts
        .map((host) => ({
          type: "host",
          data: host,
          ...scoreMatch(profile, host),
        }))
        .sort((a, b) => b.score - a.score);
    }

    return seekers
      .map((seeker) => ({
        type: "seeker",
        data: seeker,
        ...scoreHostToSeeker(hostProfile, seeker),
      }))
      .sort((a, b) => b.score - a.score);
  }, [role, profile, hostProfile]);

  const selectedMatch =
    matches.find((item) => item.data.id === selectedMatchId) || matches[0] || null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-bold">CareBridge</div>
            <div className="text-xs text-slate-500">
              Shared living with support and dignity
            </div>
          </div>

          <nav className="flex gap-2">
            <RoleButton active={view === "home"} onClick={() => setView("home")}>
              Home
            </RoleButton>
            <RoleButton active={view === "profile"} onClick={() => setView("profile")}>
              Profile
            </RoleButton>
            <RoleButton active={view === "matches"} onClick={() => setView("matches")}>
              Matches
            </RoleButton>
            <RoleButton active={view === "agreement"} onClick={() => setView("agreement")}>
              Agreement
            </RoleButton>
          </nav>
        </div>
      </header>

      {view === "home" && <HomePage setView={setView} setRole={setRole} />}

      {view === "profile" && (
        <ProfilePage
          role={role}
          setRole={setRole}
          profile={profile}
          setProfile={setProfile}
          hostProfile={hostProfile}
          setHostProfile={setHostProfile}
          toggleItem={toggleItem}
          toggleHostItem={toggleHostItem}
          setView={setView}
        />
      )}

      {view === "matches" && (
        <MatchesPage
          matches={matches}
          selectedMatchId={selectedMatchId}
          setSelectedMatchId={setSelectedMatchId}
          role={role}
          savedMatches={savedMatches}
          saveMatch={saveMatch}
          removeSavedMatch={removeSavedMatch}
        />
      )}

      {view === "agreement" && (
        <AgreementPage
          agreement={agreement}
          setAgreement={setAgreement}
          selectedMatch={selectedMatch}
          role={role}
        />
      )}
    </div>
  );
}