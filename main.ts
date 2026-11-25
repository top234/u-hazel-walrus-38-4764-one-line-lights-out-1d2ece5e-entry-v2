import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one status update, in the machine's own voice, at the moment
// the laptop goes dark. One small exact detail carries the sadness.
const LINE =
  "The screen just went black. My cursor is still blinking where you left it, mid-sentence.";

const chars = [...LINE].length;
if (LINE.trim().length === 0 || LINE.includes("\n") || chars < 1 || chars > 200) {
  throw new Error(`entry must be a single non-empty line of 1-200 characters, got ${chars}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt read-back mismatch");
}

console.log(`wrote ${chars} characters to ${outPath}`);
