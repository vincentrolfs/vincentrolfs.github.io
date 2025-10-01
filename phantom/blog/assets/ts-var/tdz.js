function example() {
  const result = Math.random() < 0.5 ? useX() : 1; // 50% probability of a ReferenceError
  const x = 10;

  return result;

  function useX() {
    return x;
  }
}
