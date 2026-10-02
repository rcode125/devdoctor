export type ParsedVersion = {
  major: number;
  minor: number;
  patch: number;
  raw: string;
};

const VERSION_PATTERN = /(\d+)\.(\d+)\.(\d+)/;

export function parseVersion(input: string): ParsedVersion | null {
  const match = input.trim().match(VERSION_PATTERN);
  if (!match) {
    return null;
  }

  const major = Number(match[1]);
  const minor = Number(match[2]);
  const patch = Number(match[3]);

  if (Number.isNaN(major) || Number.isNaN(minor) || Number.isNaN(patch)) {
    return null;
  }

  return {
    major,
    minor,
    patch,
    raw: match[0]
  };
}
