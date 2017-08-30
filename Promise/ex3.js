function fakeAjax(url, cb) {
  // debugger;
  var fakeResponses = {
    "file1": "... first text",
    "file2": "... second text",
    "file3": "... third text",
  }
  var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
  console.log(`requesting ${url} (response delay = ${randomDelay})`);
  setTimeout(function () {
    // debugger;
    cb(fakeResponses[url]);
    // debugger;
  }, randomDelay)
}

function output(text) {
  console.log(`rendering ${text}`);
}

function getFile(file) {
  return new Promise(function executor(resolve, reject) {
    fakeAjax(file, function(text) { resolve(text); });
  });
}

let p1 = getFile('file1');
let p2 = getFile('file2');
let p3 = getFile('file3');

p1
.then(output)
.then(function(d) {
  console.log(d); // undefined, return of output function
  // debugger;
  return p2
})
.then(output)
.then(function() { return p3 })
.then(output)
.then(function() {
  output('Complete !');
  throw new Error();
})
.catch(function(e) {
  console.log(e);
  debugger;
  return 'error...'; // passed to next then
})
.then(function(d) {
  debugger;
  console.log(d);
})



