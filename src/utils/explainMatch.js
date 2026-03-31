export function explainMatch(match, role) {
  if (!match) {
    return "No match selected yet.";
  }

  const name = match.data?.name || "this person";
  const reasons = match.reasons || [];
  const concerns = match.concerns || [];
  const score = match.score ?? 0;

  let tone = "potential";
  if (score >= 85) tone = "strong";
  else if (score >= 70) tone = "good";
  else if (score >= 50) tone = "moderate";

  const topReasons = reasons.slice(0, 3);
  const topConcern = concerns[0];

  let sentence = `This is a ${tone} match with ${name}`;

  if (topReasons.length > 0) {
    sentence += ` because ${topReasons
      .map((reason, index) => {
        const lower = reason.charAt(0).toLowerCase() + reason.slice(1);
        if (index === 0) return lower;
        if (index === topReasons.length - 1) return `and ${lower}`;
        return lower;
      })
      .join(", ")}`;
  } else {
    sentence += ` based on the current profile information`;
  }

  sentence += ".";

  if (topConcern) {
    sentence += ` One thing to clarify is: ${topConcern.toLowerCase()}.`;
  }

  if (role === "seeker") {
    sentence += " This could be a helpful shared-living option to explore further.";
  } else {
    sentence += " This seeker may be worth contacting for a first conversation.";
  }

  return sentence;
}