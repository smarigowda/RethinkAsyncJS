function fakeAjax(url, cb) {
  var fakeResponses = {
    "file1": "...first text",
    "file2": "...middle text",
    "file3": "...last text",
  }

  var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
  console.log(`requesting file... ${url} (response delay = ${randomDelay})`);


  setTimeout(function() {
    cb(fakeResponses[url]);
  }, randomDelay)
}

function output(text) {
  console.log(`rendering the response --- ${text}`);
}

// fakeAjax('file1', function(text) {
//   output(text);
// });

function getFile(file) {
  fakeAjax(file, function(text) {
    debugger;
    handleResponse(file, text)
  })
}

let responses = {}; // to track the status of response

function handleResponse(file, text) {

  if(!(file in responses)) {
    debugger;
    responses[file] = text;
  }

    let filenames = [ 'file1', 'file2', 'file3']; // to control the sequence of rendering
    for(let i = 0; i < filenames.length; i++) {
      debugger;
      if(filenames[i] in responses) { // have we receved the response ?
        debugger;
        if(typeof responses[filenames[i]] === 'string') { // has it been already rendered
          debugger;
          output(responses[filenames[i]]); // render it
          responses[filenames[i]] = false; // mark as rendered
          debugger;
        }
      } else {
        debugger;
        return;
      }
    }
}

getFile('file1');
debugger;
getFile('file2');
debugger;
getFile('file3');
debugger;


