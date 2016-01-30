global.requireLocal = function(name) {
    return require(__dirname + '/' + name);
}

global.requireConfig = function(file) {
    return requireLocal('config/' + file);
}
