function example(measurement) {
  console.log(calculation); // ReferenceError
  console.log(anotherCalc); // ReferenceError

  if (measurement > 1) {
    const calculation = measurement + 1;
    let anotherCalc = measurement * 2;
    // ...
  } else {
    // ...
  }

  console.log(calculation); // ReferenceError
  console.log(anotherCalc); // ReferenceError
}
