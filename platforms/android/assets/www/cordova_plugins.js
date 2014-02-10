cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/it.mobimentum.phonegapspinnerplugin/www/spinnerplugin.js",
        "id": "it.mobimentum.phonegapspinnerplugin.SpinnerPlugin",
        "clobbers": [
            "window.spinnerplugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "it.mobimentum.phonegapspinnerplugin": "1.0.0"
}
// BOTTOM OF METADATA
});