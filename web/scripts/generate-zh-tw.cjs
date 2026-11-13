// Dumps the zh-CN UI resources as JSON on stdout. Used by generate-zh-tw.py to
// rebuild src/i18n/zh-tw.generated.json. Run from web/: see generate-zh-tw.py.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

const root = path.resolve(__dirname, "..", "src");

function loadSource(filename, cache = new Map()) {
  if (filename.endsWith(".json")) return { default: JSON.parse(fs.readFileSync(filename, "utf8")) };
  if (cache.has(filename)) return cache.get(filename);
  const exports = {};
  cache.set(filename, exports);
  const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  }).outputText;
  vm.runInNewContext(
    compiled,
    {
      exports,
      Error,
      require: (id) =>
        id.startsWith("@/")
          ? loadSource(path.resolve(root, `${id.slice(2)}.ts`), cache)
          : id.startsWith(".")
            ? loadSource(path.resolve(path.dirname(filename), id.endsWith(".json") ? id : `${id}.ts`), cache)
            : require(id),
    },
    { filename },
  );
  return exports;
}

const { zhCNTranslation } = loadSource(path.resolve(root, "i18n", "messages.ts"));
process.stdout.write(JSON.stringify(zhCNTranslation));
