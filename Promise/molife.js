function getData(d) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(d)
    }, 1000);
  })
}

getData(10)
.then(function(d) {
  console.log(d);
  return getData(d + 1)
})
.then(function(d) {
  console.log(d);
  return getData(`meaning of life = ${d}`);
})
.then(function(d) {
  console.log(d);
});
