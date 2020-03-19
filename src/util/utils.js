module.exports.extractFileType = str => {
  var path_splitted = str.split(".");
  var extension = path_splitted.pop();
  return extension;
};
