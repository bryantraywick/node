process.mixin(require("../common"));

var got_error = false;
var success_count = 0;

var file = path.join(fixturesDir, "a.js");

fs.chmod(file, 0777, function (err) {
  if (err) {
    got_error = true;
  } else {
    puts(fs.statSync(file).mode);
    assert.equal(0777, fs.statSync(file).mode & 0777);
    
    fs.chmodSync(file, 0644);
    assert.equal(0644, fs.statSync(file).mode & 0777);
    success_count++;
  }
});

process.addListener("exit", function () {
  assert.equal(1, success_count);
  assert.equal(false, got_error);
});

