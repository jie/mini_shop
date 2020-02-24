function writeFile(filepath, data, callback) {
  fs.writeFile(filepath, data, 'utf8', function (error) {
    if (error) {
      throw error;
    } else {
      if (callback) {
        callback()
      }
    }
  });
}


module.exports = {
  writeFile: writeFile
}