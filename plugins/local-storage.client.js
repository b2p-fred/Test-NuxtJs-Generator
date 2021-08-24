/*
 * Browser local storage abstraction
 * Avoid using the local storage directly!
 * -------------------------
 * read, write and delete values
 */
export default ({app}, inject) => {
  inject('readFromStorage', (key) => {
    if (localStorage.getItem(key)) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        localStorage.removeItem(key);
        throw e;
      }
    }
  });

  inject('writeToStorage', (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  inject('removeFromStorage', (key) => {
    localStorage.removeItem(key);
  });
}
