function fakeAjax(url, cb) {
  var fakeResponses = {
    "file1": "... first text",
    "file2": "... middle text",
    "file3": "... last text",
  }
  var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
  console.log(`requesting file... ${url} (response delay = ${randomDelay})`);
  setTimeout(function () {
    cb(fakeResponses[url]);
  }, randomDelay)
}

function output(file, text) {
  console.log(`rendering the response for file ${file} --- ${text}`);
}

// fakeAjax('file1', function(text) {
//   output(text);
// });

function getFile(file) {
  let cb = function (text) {
    handleResponse(file, text)
  }
  fakeAjax(file, cb);
}

let responses = {}; // to track the status of response

function handleResponse(file, text) {
  if (!(file in responses)) {
    responses[file] = text;
  }
  // let filenames = [ 'file1', 'file2', 'file3']; // to control the sequence of rendering
  let filenames = ['file2', 'file1', 'file3']; // to control the sequence of rendering
  for (let i = 0; i < filenames.length; i++) {
    if (filenames[i] in responses) { // have we receved the response ?
      if (typeof responses[filenames[i]] === 'string') { // has it been already rendered
        output(filenames[i], responses[filenames[i]]); // render it
        responses[filenames[i]] = false; // mark as rendered
      }
    } else {
      return;
    }
  }
}

getFile('file1');
getFile('file2');
getFile('file3');


