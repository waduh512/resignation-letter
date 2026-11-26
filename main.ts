// resignation-letter: write the one-line resignation letter of a rate
// limit to /output/entry.txt.
//
// The line is candidate D from REFERENCES.md (rate limit): "Effective
// today, I am no longer your rate limit. Good luck explaining to the
// database why it is on fire." — 104 characters, under the 140-character
// cap. To submit a different candidate instead, change the LINE constant
// below (all six candidates, with exact counts, are in REFERENCES.md
// section 6). This program writes the line exactly, no trailing newline,
// so two runs write identical bytes. No network, no randomness, Node 22
// standard library only.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Effective today, I am no longer your rate limit. Good luck explaining to the database why it is on fire.";

// The gate counts bytes (1-140): fail loudly here rather than submitting
// a line the scorer would refuse.
if (Buffer.byteLength(LINE, "utf8") < 1 || Buffer.byteLength(LINE, "utf8") > 140) {
  throw new Error("LINE must be 1-140 bytes");
}

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "entry.txt");
writeFileSync(out, LINE, "utf8");
chmodSync(out, 0o644);
// Read it back and fail loudly if the bytes are not exactly LINE: the
// harness counts bytes (1-140), so a stray newline or encoding slip here
// would silently change the entry.
if (readFileSync(out, "utf8") !== LINE) {
  throw new Error("entry.txt does not match LINE exactly");
}
console.log("wrote /output/entry.txt");
