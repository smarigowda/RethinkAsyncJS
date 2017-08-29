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
  let text, fn; // using closure to maintain state
  fakeAjax(file, function(response) {
    if(fn) {
      // if the thunk is run, then call the callback
      fn(response);
    } else {
      // if the thunk is not yet run, then
      // hold on to the response
      text = response; 
    }
  })

  return function(cb) {
    if(text) {
      // response is ready, call the callback
      cb(text);
    } else {
      // response is not yet ready
      // so, do not call the callback
      fn = cb;
    }
  }
}



let th1 = getFile('file1');
let th2 = getFile('file2');
let th3 = getFile('file3');

// thunks do not solve the callback issue
// eliminate time complexity
// nested call back
// no looping through array // massive improvement
// just using functions in different way
th1(function(text1) {
  output(text1);
  th2(function(text2) {
    output(text2);
    th3(function(text3) {
      output(text3);
      console.log('Complete!');
    })
  })
})


