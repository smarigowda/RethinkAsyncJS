function coroutine(gen) {
  let it = gen();
  return function() {
    return it.next.apply(it, arguments)
  }
}

function getData(d) {
  setTimeout(function() {
    run(d)
  }, 1000);
}

// sync looking async code
let run = coroutine(function* () {
  let x = 1 + (yield getData(10));
  let y = 1 + (yield getData(30));
  let answer = yield getData(`meaning of life = ${x + y}`);
  console.log(answer);
})

run(); // kick off the generator
