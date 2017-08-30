function fakeAjax(url, cb) {
  var fakeResponses = {
    "file1": "... first text",
    "file2": "... second text",
    "file3": "... third text",
  }
  var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;
  console.log(`requesting ${url} (response delay = ${randomDelay})`);
  setTimeout(function () {
    cb(fakeResponses[url]);
  }, randomDelay)
}

function output(text) {
  console.log(`rendering ${text}`);
}

// Active Thunk
// There is a race condition which is resolved by using closure to maintain the state
function getFile(file) {
  let fileTemp = file;
  let text, fn; // using closure to maintain state
  fakeAjax(file, function(response) {
    if(fn) {
      // console.log(file);
      debugger;
      // if the thunk is run, then call the callback
      fn(response);
    } else {
      // if the thunk is not yet run, then
      // hold on to the response
      debugger;
      text = response; 
    }
  })

  return function(cb) {
    if(text) {
      // response is ready, call the callback
      debugger;
      cb(text);
    } else {
      // response is not yet ready
      // so, do not call the callback
      fn = cb;
    }
  }
}

debugger;
let th1 = getFile('file1');
debugger;
let th2 = getFile('file2');
debugger;
let th3 = getFile('file3');
debugger;

// thunks do not solve the callback issue
// eliminate time complexity
// nested call back
// no looping through array // massive improvement
// just using functions in different way
th1(function(text1) {
  debugger;
  output(text1);
  th2(function(text2) {
    debugger;
    output(text2);
    th3(function(text3) {
      debugger;
      output(text3);
      console.log('Complete!');
    })
  })
})


