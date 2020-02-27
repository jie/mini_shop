var fs = require('fs')


function writeFile(filepath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      }
      resolve()
    });
  })
}


module.exports = {
  writeFile: writeFile
}