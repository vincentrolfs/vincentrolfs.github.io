function example() {
  var result = useX(); // undefined
  var x = 10;

  return result; // undefined

  function useX() {
    return x;
  }
}

console.log(example()); // undefined
