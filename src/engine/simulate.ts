export type Status = "ok" | "warn" | "down"

export interface ServerState {
  name: string
  load: number // percent of capacity
  status: Status
}

const CAPACITY = 30 // thousands of users one server can handle

export function simulate(users: number, serverCount: number): ServerState[] {
  const names = ["A", "B", "C"]
  const load = (users / (CAPACITY * serverCount)) * 100
  const status: Status = load >= 100 ? "down" : load >= 70 ? "warn" : "ok"
  return Array.from({ length: serverCount }, (_, i) => ({
    name: names[i],
    load,
    status,
  }))
}