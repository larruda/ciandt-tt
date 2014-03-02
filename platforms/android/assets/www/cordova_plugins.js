cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/uk.co.whiteoctober.cordova.AppVersion/www/AppVersionPlugin.js",
        "id": "uk.co.whiteoctober.cordova.AppVersion.AppVersionPlugin",
        "clobbers": [
            "cordova.getAppVersion"
        ]
    },
    {
        "file": "plugins/it.mobimentum.phonegapspinnerplugin/www/spinnerplugin.js",
        "id": "it.mobimentum.phonegapspinnerplugin.SpinnerPlugin",
        "clobbers": [
            "window.spinnerplugin"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/notification.js",
        "id": "org.apache.cordova.dialogs.notification",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.dialogs/www/android/notification.js",
        "id": "org.apache.cordova.dialogs.notification_android",
        "merges": [
            "navigator.notification"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.device": "0.2.8",
    "uk.co.whiteoctober.cordova.AppVersion": "0.1.3",
    "it.mobimentum.phonegapspinnerplugin": "1.0.2",
    "org.apache.cordova.network-information": "0.2.7",
    "org.apache.cordova.dialogs": "0.2.6"
}
// BOTTOM OF METADATA
});