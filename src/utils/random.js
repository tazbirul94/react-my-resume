// src/utils/random.js
const Random = {
  shuffleArray(input) {
    if (!Array.isArray(input)) return [];
    const arr = input.slice();            // copy once
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 0..i inclusive
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }
};

export default Random;