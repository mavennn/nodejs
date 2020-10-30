"use strict";

const fs = require('fs');
const path = require('path');

const directory = "/Users/gadoevalex/Desktop/evm/lab2/";

const MAX_LENGTH = 10;

var walk = function(dir, done) {
    var results = [];

    fs.readdir(dir, function(err, list) {
      if (err) return done(err);

      var pending = list.length;
            
      if (!pending) return done(null, results);

      list.forEach(function(file) {
        file = path.resolve(dir, file);
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            fs.readFile(file, "utf-8", (err, text) => {
                if (text.length <= MAX_LENGTH) {
                    console.log(text);
                }
            })

            results.push(file);
            if (!--pending) done(null, results);
          }
        });
      });
    });
  };

(async function main() {

    walk(directory, (err, results) => {
        if (err) console.log(err);
    })

})()
