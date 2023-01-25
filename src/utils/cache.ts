enum CacheType {
  local,
  session
}
class Cache {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.local ? localStorage : sessionStorage
  }
  setCache<T = any>(key: string, value: T) {
    if (value != undefined) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }
  getCache<T = any>(key: string): void | T {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clearCache() {
    this.storage.clear
  }
}
const localCache = new Cache(CacheType.local)
const sessionCache = new Cache(CacheType.session)
export { localCache, sessionCache }
