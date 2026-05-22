import fs from "fs";
import path from "path";

const now = Date.now();
const thresholdMs = 15 * 60 * 1000; // 15 minutes

function scanDirAll(dir: string, depth = 0) {
  if (depth > 6) return;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      try {
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          if (["proc", "sys", "dev", "lib", "lib64", "run", "var", "etc", "boot", "node_modules", ".git", "dist", ".cache"].includes(file)) {
            continue;
          }
          scanDirAll(fullPath, depth + 1);
        } else {
          const age = now - stat.mtimeMs;
          if (age < thresholdMs) {
            console.log(`RECENT FILE: ${fullPath} (${stat.size} bytes, age: ${Math.round(age / 1000)}s)`);
          }
        }
      } catch (e) {}
    }
  } catch (e) {}
}

scanDirAll("/");
console.log("Scan complete");
