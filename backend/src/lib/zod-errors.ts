import type { core } from 'zod';

type ZodIssue = core.$ZodIssue;

/** Turns zod issues into a readable message: "field: reason; field2: reason". */
export function formatZodErrors(issues: ReadonlyArray<ZodIssue>): string {
  return issues
    .map((i) => {
      const path = i.path.join('.');
      return path ? `${path}: ${i.message}` : i.message;
    })
    .join('; ');
}
