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

// fakeAjax('file1', function(text) {
//   output(text);
// });

// function getFile(file) {
//   let cb = function (text) {
//     handleResponse(file, text)
//   }
//   fakeAjax(file, cb);
// }

// Active Thunk
function getFile(file) {
  let text, fn; // bridging with closure
  fakeAjax(file, function(response) {
    if(fn) {
      fn(response);
    } else {
      text = response;
    }
  })

  return function(cb) {
    if(text) {
      cb(text);
    } else {
      fn = cb;
    }
  }
}



let th1 = getFile('file1');
let th2 = getFile('file2');
let th3 = getFile('file3');

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


