import { AgencyResult } from './types'

const _store = new Map<string, AgencyResult>()

export function saveResult(result: AgencyResult) {
  _store.set(result.id, result)
}

export function getResult(id: string): AgencyResult | null {
  return _store.get(id) ?? null
}
