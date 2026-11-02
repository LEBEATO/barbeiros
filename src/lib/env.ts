export function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error("Configure " + name);
  return value;
}
