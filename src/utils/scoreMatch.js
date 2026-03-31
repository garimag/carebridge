export function scoreMatch(seeker, host) {
  let score = 0;
  const reasons = [];
  const concerns = [];

  if (seeker.city && seeker.city === host.city) {
    score += 25;
    reasons.push("Same city");
  }

  const sharedSkills = seeker.skills.filter((skill) =>
    host.supportNeeds.includes(skill)
  );

  if (sharedSkills.length > 0) {
    score += Math.min(30, sharedSkills.length * 10);
    reasons.push(`Shared support needs: ${sharedSkills.join(", ")}`);
  } else {
    concerns.push("No direct overlap in support needs yet");
  }

  const scheduleOverlap = seeker.schedule.filter((slot) =>
    host.schedule.includes(slot)
  );

  if (scheduleOverlap.length > 0) {
    score += Math.min(20, scheduleOverlap.length * 10);
    reasons.push(`Schedule overlap: ${scheduleOverlap.join(", ")}`);
  } else {
    concerns.push("Limited schedule overlap");
  }

  const languageOverlap = seeker.languages.filter((lang) =>
    host.languages.includes(lang)
  );

  if (languageOverlap.length > 0) {
    score += 10;
    reasons.push(`Shared language: ${languageOverlap.join(", ")}`);
  }

  if (seeker.okayWithPets || !host.pets) {
    score += 5;
  } else {
    concerns.push("Pet preference mismatch");
  }

  if (
    typeof seeker.quietHome === "boolean" &&
    seeker.quietHome === host.quietHome
  ) {
    score += 10;
    reasons.push("Lifestyle preference aligned");
  }

  return {
    score: Math.min(100, score),
    reasons,
    concerns,
  };
}

export function scoreHostToSeeker(host, seeker) {
  let score = 0;
  const reasons = [];
  const concerns = [];

  if (host.city && host.city === seeker.city) {
    score += 25;
    reasons.push("Same city");
  }

  const sharedNeeds = host.supportNeeds.filter((need) =>
    seeker.skills.includes(need)
  );

  if (sharedNeeds.length > 0) {
    score += Math.min(30, sharedNeeds.length * 10);
    reasons.push(`Support fit: ${sharedNeeds.join(", ")}`);
  } else {
    concerns.push("Seeker does not currently match the main support needs");
  }

  const scheduleOverlap = host.schedule.filter((slot) =>
    seeker.schedule.includes(slot)
  );

  if (scheduleOverlap.length > 0) {
    score += Math.min(20, scheduleOverlap.length * 10);
    reasons.push(`Schedule overlap: ${scheduleOverlap.join(", ")}`);
  } else {
    concerns.push("Limited schedule overlap");
  }

  const languageOverlap = host.languages.filter((lang) =>
    seeker.languages.includes(lang)
  );

  if (languageOverlap.length > 0) {
    score += 10;
    reasons.push(`Shared language: ${languageOverlap.join(", ")}`);
  }

  if (!host.pets || seeker.okayWithPets) {
    score += 5;
  } else {
    concerns.push("Pet compatibility issue");
  }

  if (
    typeof host.quietHome === "boolean" &&
    host.quietHome === seeker.quietHome
  ) {
    score += 10;
    reasons.push("Lifestyle preference aligned");
  }

  if (seeker.hoursAvailable >= host.hoursNeeded) {
    score += 10;
    reasons.push("Seeker has enough availability");
  } else {
    concerns.push("Seeker may not have enough weekly hours");
  }

  return {
    score: Math.min(100, score),
    reasons,
    concerns,
  };
}