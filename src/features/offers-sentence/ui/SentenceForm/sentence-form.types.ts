export interface SentenceFormValues {
  name: string;
  categoryId: string;
  description: string;
  codeMode: "link" | "paste" | "file";
  codeLink: string;
  codePaste: string;
  tags: string[];
}

export const TAG_SUGGESTIONS = [
  "next",
  "react",
  "typescript",
  "css",
  "animation",
  "ui",
  "hooks",
  "form",
  "chart",
  "theme",
  "responsive",
];

