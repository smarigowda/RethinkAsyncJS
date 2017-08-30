let ASQ = require('asynquence');
// console.log(ASQ);
// debugger;

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

// let getFilePromise = ASQ.wrap(fakeAjax, { simplecb: true });

function getFile(file) {
  console.log(`getFile request for - file ${file}`);
  return ASQ(function(done) {
    fakeAjax(file, done);
  })
}

// let s1 = getFile('file1');
// let s2 = getFile('file2');
// let s3 = getFile('file3');

// all getFile requests are made in parallel.

getFile('file1')
.val(output)
.seq(getFile('file2'))
.val(output)
.seq(getFile('file3'))
.val(output)
.val(function() {
  output('Complete !');
})




