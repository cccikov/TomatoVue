/*
 * @Author: sihui.cao
 * @Date:   2017-04-13 14:52:42
 * @Last Modified by:   sihui.cao
 * @Last Modified time: 2017-04-13 15:22:15
 */

var fs = require('fs'),
    path = require('path')

module.exports = {
    getEntry: function(config) {
        var entryExport = {}
        for (var pathItem in config.path) {
            var srcPath = path.join(__dirname, '../', config.path[pathItem])
            fs.readdirSync(srcPath).forEach(function(v) {
                var tmpSrc = path.join(srcPath, v);
                if (fs.statSync(tmpSrc).isDirectory()) {
                    fs.readdirSync(tmpSrc).forEach(function(jsFile) {
                        var filePath = path.join(tmpSrc, jsFile);
                        if (fs.existsSync(filePath) && jsFile.indexOf('.js') !== -1) {
                            var _pageName = jsFile.replace('.js', '');
                            entryExport[v + '.' + _pageName] = filePath;
                        }
                    })
                }
            })
        }
        return entryExport;
    }
}
