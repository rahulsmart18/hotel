// Patches all fs directory reading methods to return [] for the locked lithos directory.
const fs = require("fs");
const path = require("path");

const LOCKED = path.resolve(__dirname, "..", "src", "app", "lithos");

function isLocked(p) {
  try { return path.resolve(String(p)) === LOCKED; } catch { return false; }
}

// --- sync ---
const origSync = fs.readdirSync.bind(fs);
fs.readdirSync = function (p, ...args) {
  if (isLocked(p)) return [];
  return origSync(p, ...args);
};

// --- callback ---
const origCb = fs.readdir.bind(fs);
fs.readdir = function (p, ...args) {
  if (isLocked(p)) {
    const cb = typeof args[args.length - 1] === "function" ? args[args.length - 1] : null;
    if (cb) { process.nextTick(() => cb(null, [])); return; }
  }
  return origCb(p, ...args);
};

// --- promises ---
const origPromise = fs.promises.readdir.bind(fs.promises);
fs.promises.readdir = async function (p, ...args) {
  if (isLocked(p)) return [];
  return origPromise(p, ...args);
};

// Patch opendir / opendirSync
if (fs.opendirSync) {
  const origODS = fs.opendirSync.bind(fs);
  fs.opendirSync = function (p, ...args) {
    if (isLocked(p)) {
      // Return a fake Dir object that immediately signals done
      return {
        path: String(p),
        readSync() { return null; },
        read(cb) { if (cb) process.nextTick(() => cb(null, null)); return Promise.resolve(null); },
        close(cb) { if (cb) process.nextTick(() => cb(null)); return Promise.resolve(); },
        closeSync() {},
        [Symbol.asyncIterator]() { return { async next() { return { done: true, value: undefined }; } }; },
      };
    }
    return origODS(p, ...args);
  };
}

if (fs.promises.opendir) {
  const origODP = fs.promises.opendir.bind(fs.promises);
  fs.promises.opendir = async function (p, ...args) {
    if (isLocked(p)) {
      return {
        path: String(p),
        async read() { return null; },
        async close() {},
        [Symbol.asyncIterator]() { return { async next() { return { done: true, value: undefined }; } }; },
      };
    }
    return origODP(p, ...args);
  };
}

console.log("[prebuild-fix] All fs directory methods patched for lithos EPERM suppression");
