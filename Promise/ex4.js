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
    fakeAjax(file, function(text) {
      debugger;
      resolve(text);
      debugger;
    });
  });
}

// let p1 = getFile('file1');
// let p2 = getFile('file2');
// let p3 = getFile('file3');

['file1', 'file2', 'file3']
.map(getFile)
.reduce(function combined(chain, pr) {
  console.log(`chain = ${chain}`);
  console.log(`pr = ${pr}`);
  debugger;
  return chain.then(function() {
    debugger;
    console.log(pr);
    return pr;
  }).then(output);
}, Promise.resolve())
.then(function() {
  output('Complete !');
});



