function* main() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
}

let it = main();

console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());