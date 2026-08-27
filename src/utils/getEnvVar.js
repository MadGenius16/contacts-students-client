export function getEnvVar(name, defaultValue) {
  const value = import.meta.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: import.meta.env['${name}'].`);
}
