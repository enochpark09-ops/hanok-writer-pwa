const HISTORY_KEY = 'hw_history'
const API_KEY = 'hw_api_key'

export function saveApiKey(key) {
  localStorage.setItem(API_KEY, key)
}

export function loadApiKey() {
  return localStorage.getItem(API_KEY) || ''
}

export function saveHistory(item) {
  const list = loadHistory()
  list.unshift({ ...item, id: Date.now(), createdAt: new Date().toISOString() })
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 50)))
}

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
  } catch { return [] }
}

export function deleteHistory(id) {
  const list = loadHistory().filter(i => i.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY)
}
