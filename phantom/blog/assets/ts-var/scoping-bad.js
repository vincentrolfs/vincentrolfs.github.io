function example(measurement) {
  console.log(calculation); // undefined - accessible! calculation leaked out
  console.log(i); // undefined - accessible! i leaked out

  if (measurement > 1) {
    var calculation = measurement + 1;
    // ...
  } else {
    // ...
  }

  console.log(calculation); // 1 - accessible! calculation leaked out

  for (var i = 0; i < 3; i++) {
    // ...
  }

  console.log(i); // 3 - accessible! i leaked out
}
