function delay(num) {
  console.log(`waiting ${num} ms`)
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, num);
  })
}

delay(5000)
.then(function() {
  return delay(3000);
})
.then(function() {
  console.log('... end');
});