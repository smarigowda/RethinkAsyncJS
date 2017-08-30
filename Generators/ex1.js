function* gen() {
  console.log('Hello');
  yield;
  console.log('World')
}

let it = gen(); // Produces an iterator
it.next(); // Hello
it.next(); // World

