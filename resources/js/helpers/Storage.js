class Cache {
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  static remove(key) {
    localStorage.removeItem(key);
  }
}

export default Cache;
