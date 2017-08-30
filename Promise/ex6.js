let ASQ = require('asynquence');

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
  return ASQ(function(done) {
    fakeAjax(file, done);
  });
}

ASQ()
.seq(...(['file1', 'file2', 'file3']
        .map(getFile)
        .map(function transform(seq) {
          return function() {
            return seq.val(output);
          }
        }))
) // order is not guaranteed
.val(function() {
  output('Complete !');
})


