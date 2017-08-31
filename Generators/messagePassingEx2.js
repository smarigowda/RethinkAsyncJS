function coroutine(gen) {
  let it = gen();
  return function() {
    return it.next.apply(it, arguments)
  }
}

let run = coroutine(function* () {
  let x = 1 + (yield);
  let y = 1 + (yield);
  yield x + y;
})

console.log(run());
debugger;
console.log(run(9))
debugger;
console.log(run(39).value); // { value: 50, done: false }
debugger;
console.log(run().done); // { value: undefined, done: true }
