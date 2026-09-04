/*
    Fibonacci Sequence - Enter a number and have the program
    generate the Fibonacci sequence to that number or to the Nth number.
*/
// This array will keep memory of the previous fibonacci numbers

fibonacciOutput = document.getElementById("fibonacciLbl");

var memo = {
  1: 1,
  2: 1,
};
function fibonacci() {
  "use strict";
  var n = document.getElementById("num").value;
  var val = f(n);
  return val;
}

function f(n) {
  var value;
  // Check if the memory array already contains the requested number
  if (memo.hasOwnProperty(n)) {
    value = memo[n];
  } else {
    //TODO: Implement the fibonacci function here!
    let elements = Object.keys(memo).length;

    while (!memo.hasOwnProperty(n)) {
      memo[elements + 1] = Number(memo[elements]) + Number(memo[elements - 1]);
      elements++;
    }
    value = memo[n];
  }

  return value;
}
console.log(f(15));

document.getElementById("btn").addEventListener("click", () => {
  let n = fibonacci();
  fibonacciOutput.textContent = n;
});
