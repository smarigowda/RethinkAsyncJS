function addAsync(x, y, cb) {
  setTimeout(function() {
    cb(x + y);
  }, 4000)
}

let thunk = function(cb) {
  addAsync(10, 12, cb)
}

thunk(function(result) {
  console.log(result);
})
