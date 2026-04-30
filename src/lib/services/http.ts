export async function getJson<T>(path: string): Promise<T> { const r = await fetch(path, { cache: 'no-store' }); return r.json(); }
export async function postJson<T>(path: string, body: unknown): Promise<T> { const r = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); return r.json(); }
