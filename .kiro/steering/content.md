---
inclusion: fileMatch: ["src/content/**", "src/components/**"]
---

# Content Rules
- All copy lives in `src/content/wedding.ts` as typed `{ en: string; hi: string }` objects.
- Never hard-code names, dates, venues or phone numbers in components.
- Tone: warm, traditional, dignified. Example opening: "With the blessings of the Almighty and our elders,
  we joyfully invite you to celebrate the wedding of ..."
- Include an invocation at the top: "|| Shree Ganeshay Namah ||" (HI: "॥ श्री गणेशाय नमः ॥").
- Dates shown as "Sunday, 14 February 2027" (long form, en-IN). Times in 12-hour format with IST.
- Use `Intl.DateTimeFormat` for formatting; never manual string concatenation of dates.
- Hindi strings must be natural, not literal translations. Mark any machine-translated string with
  `// TODO: native review` so a Hindi speaker can verify before launch.
