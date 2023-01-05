// TODO (jy95): use a better unique id generator

export function unsafeCreateUniqueId(): string {
  return (Math.random() * 10e18 + Date.now()).toString(36);
}
