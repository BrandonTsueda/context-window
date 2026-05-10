type ExtractionInput = {
  projectName: string;
  sourceType: string;
  content: string;
  notes: string;
};

export type MockExtraction = {
  summary: string;
  decisions: string[];
  actionItems: string[];
  openQuestions: string[];
};

function pickSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function fallbackItems(content: string, prefix: string) {
  const segments = content
    .split(/\n+/)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (segments.length > 0) {
    return segments.map((segment) => segment.replace(/^[-*]\s*/, ""));
  }

  return [`${prefix} from the submitted context.`];
}

export function buildMockExtraction(input: ExtractionInput): MockExtraction {
  const sentences = pickSentences(input.content);
  const summarySource = sentences.slice(0, 2).join(" ");

  const decisions = fallbackItems(input.content, "Decision to confirm").map(
    (item, index) =>
      index === 0 ? `Continue shaping ${input.projectName} around ${item.toLowerCase()}.` : item,
  );

  const actionItems = [
    `Review the ${input.sourceType.toLowerCase()} entry and confirm what should be saved.`,
    `Extract structured output for ${input.projectName}.`,
    ...(input.notes
      ? [`Incorporate note guidance: ${input.notes}`]
      : ["Clarify whether any notes should influence extraction."]),
  ].slice(0, 4);

  const openQuestions = [
    "What should be persisted as the entry title?",
    "Should this extraction be editable before saving?",
    ...(sentences.length > 2
      ? ["Which lines in the source are true decisions versus open discussion?"]
      : ["Is there enough context in this entry to generate a reliable summary?"]),
  ];

  return {
    summary:
      summarySource ||
      `This ${input.sourceType.toLowerCase()} entry for ${input.projectName} has enough raw context to draft a structured project memory record.`,
    decisions: decisions.slice(0, 3),
    actionItems,
    openQuestions: openQuestions.slice(0, 3),
  };
}
