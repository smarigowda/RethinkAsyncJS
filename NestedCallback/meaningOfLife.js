function getData(d, cb) {
  setTimeout(function() { cb(d); }, 4000);
}

getData(10, function(d) {
  let x = 1 + d;
  console.log(x);
  getData(30, function(d) {
    let y = 1 + d;
    console.log(y);
    getData(`Meaning of life: ${x + y}`, function(d) {
      console.log(d);
    })
  })
});

