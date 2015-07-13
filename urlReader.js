var util = require('util'),
    exec = require('child_process').exec,
    child;

var url = '';//URL of site to download from;
var file = 'stylesheet.css'; //Stylesheet to read
var destination = ''; //Destination

var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(file);

lr.on('error', function (err) {
    // 'err' contains error object
});

lr.on('line', function (line) {
    // 'line' contains the current line without the trailing newline character.
    //console.log(line);
    var str = line;
    var re = /url\(([^)]+)\)/; //Find
    var found = str.match(re);

    var matches = re.exec(str);

    if(matches){
    //console.log(matches[1]);
     var re1 = /(\.\.)/;
     var re2 = /(\.\.\/fonts\/)/;
     var str = matches[1];
     var newstr = str.replace(re1, url); //Replace relative url with absolute
     var nameOfFile = str.replace(re2, ''); //Strip relative path and file path

      console.log(nameOfFile);

      child = exec('curl -o' + ' ' + destination + nameOfFile + ' ' + newstr , // command line argument directly in string
        function (error, stdout, stderr) {      // one easy function to capture data/errors
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
      });
    }

});

lr.on('end', function () {
  //  console.log('All lines are read, ' + file  + ' is closed now.');
});
