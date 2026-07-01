
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const textExtensions = new Set(['.md', '.mdx', '.astro', '.ts', '.js', '.mjs', '.json', '.yml', '.yaml', '.css', '.html', '.txt']);
const denyPatterns = [
  { name: 'private-vault-path', regex: new RegExp(`Documents/${'adoc'}-vault|OBSIDIAN_${'VAULT'}_PATH`, 'i') },
  { name: 'aws-account-id-like', regex: /\b\d{12}\b/ },
  { name: 'github-token', regex: /gh[opsu]_[A-Za-z0-9_]{20,}/ },
  { name: 'generic-secret-assignment', regex: /(api[_-]?key|secret|token|password)\s*[:=]\s*['\"]?[A-Za-z0-9_\-]{16,}/i },
  { name: 'internal-ssm-path', regex: new RegExp(`ssm:${'//'}|/tclare-${'lite'}/`, 'i') },
];
const ignoredDirs = new Set(['.git', 'node_modules', 'dist', '.astro']);
const failures = [];

function extname(path) {
  const dot = path.lastIndexOf('.');
  return dot === -1 ? '' : path.slice(dot);
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (ignoredDirs.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
      continue;
    }
    if (!textExtensions.has(extname(full))) continue;
    const rel = relative(root, full);
    const text = readFileSync(full, 'utf8');
    for (const pattern of denyPatterns) {
      if (pattern.regex.test(text)) {
        failures.push(`${rel}: ${pattern.name}`);
      }
    }
  }
}

walk(root);

if (failures.length) {
  console.error('Public content check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Public content check passed.');
