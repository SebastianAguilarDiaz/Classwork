/*
Prime Factorization - Have the user enter a number and find
all Prime Factors (if there are any) and display them.
*/
var getPrimeFactors = function (n) {
  "use strict";

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  var i,
    sequence = [];
  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime
  if (isPrime(n)) {
    sequence.push(n);
  } else {
    while (!isPrime(n)) {
      for (i = 2; i * i < n; i++) {
        if (!isPrime(i)) continue;
        while (n % i === 0) {
          sequence.push(i);
          n /= i;
        }
      }
    }
    if (n != 1) sequence.push(n);
  }
  const primeFactorsOutput = document.getElementById("pf");
  if (primeFactorsOutput === null) console.log("undefined");
  else primeFactorsOutput.textContent = sequence;
  return sequence;
};

// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
// console.log(getPrimeFactors(30030));
