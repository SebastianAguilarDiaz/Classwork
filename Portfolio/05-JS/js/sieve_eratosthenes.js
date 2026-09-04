// Get references

const goButton = document.getElementById("btn");
const numberInput = document.getElementById("num");
const primesOutput = document.getElementById("primes");

/*
Sieve of Eratosthenes - The sieve of Eratosthenes is one of the most efficient ways
to find all of the smaller primes (below 10 million or so).
*/

// TODO: Adjust this script so it can work with the sieve.html file.

var sieve = function (n) {
  "use strict";

  var array = [],
    primes = [],
    i,
    j = 0;

  // TODO: Implement the sieve of eratosthenes algorithm to find all the prime numbers under the given number.

  // so we can add every number as prime
  for (i = 0; i < n; i++) array.push(true);
  // 0 and 1 aren't prime numbers
  array[0] = false;
  array[1] = false;

  for (i = 2; i * i < n; i++) {
    // if its already marked as not prime we just continue
    if (!array[i]) continue;
    // if a bigger number is divisible by i it's not prime

    for (j = i + 1; j < n; j++) {
      if (j % i == 0) array[j] = false;
    }
  }

  for (i = 2; i < array.length; i++) if (array[i]) primes.push(i);

  return primes;
};

console.log(sieve(1000000));

const getNumber = () => {
  return numberInput.value;
};

const formatTextOutput = (array) => {
  let output = "";
  for (let i = 0; i < array.length; i++) {
    output += array[i];
    if (i < array.length - 1) {
      output += ",\t";
    }
  }
  return output;
};

goButton.addEventListener("click", () => {
  let n = getNumber();
  let primes = sieve(n);
  primesOutput.textContent = formatTextOutput(primes);
});
