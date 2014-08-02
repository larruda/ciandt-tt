/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {

    username: "",
    password: "",
    version: "",
    snapper: null,
    screen: {
        current: null,
        previous: null
    },

    // Application Constructor
    initialize: function() {
        this.bindEvents();
        jQuery.ajaxSetup({
            "async": false
        });
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("pause", this.onPause, false);
        document.addEventListener("resume", this.onResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.main();
    },

    onPause: function() {
        tt.stopTimer();
    },

    onResume: function() {
        $("#time").innerHTML = "Loading...";

        if (!app.isOnline()) {   
            app.notify("No connection", "Please turn on your internet connection and restart the app.");
            app.testConnection();
            return;
        }
        app.sync();      
    },

    initFastClick: function() {
        FastClick.attach(document.body);
    },

    main: function() {
        app.initFastClick();
        app.bindScreenEvents();
        app.show();
        app.drawer();

        cordova.getAppVersion(function (version) {
            app.version = version;
        });
    },

    show: function() {
        document.getElementsByClassName('snap-item')[0].click();
        main.load();
    },

    drawer: function() {
        app.snapper = new Snap({
            element: document.getElementById('app'),
            disable: "right"
        });
    },

    validate: function() {
        if (!app.isOnline()) {
            app.notify("No connection", "Please turn on your internet connection and restart the app.");
            app.testConnection();
            return;
        }

        app.getUserData();

        if (!app.validFields()) {
            app.notify("Warning", "Enter both username and password.");
            return;
        }

        if (app.empty(tt.time)) {
            app.notify("Warning", "Please wait for the clock to sync with the network time server.");
            return;
        }

        return true;
    },

    isOnline: function() {
        if (navigator.connection.type == Connection.UNKNOWN ||
            navigator.connection.type == Connection.NONE) {
            return false;
        }
        return true;
    },

    testConnection: function() {
        // @TODO
    },

    rememberMe: function(store) {
        if (store) {
            localStorage.remember = true;
            localStorage.username = app.username;
            localStorage.password = app.password;
            localStorage.lastRecord = tt.time.lastRecord;
            localStorage.fullName = tt.response.msg.msg.match("MARCACAO EFETUADA (.*)")[1];

            app.el("auth").style.display = "none";
            app.el("user-data").style.display = "block";

            app.el("full-name").innerHTML = app.getUserFullName();
            app.el("last-record").innerHTML = app.getLastRecord();
        }

        if (localStorage.remember == undefined) {
            localStorage.remember = false;
        }
        return JSON.parse(localStorage.remember);
    },

    forget: function() {
        localStorage.remember = false;
        localStorage.username = null;
        localStorage.password = null;
        localStorage.lastRecord = null;
        localStorage.fullName = null;

        app.el("auth").style.display = "block";
        app.el("user-data").style.display = "none";
        app.el("remember").checked = false;
    },

    notify: function(title, message) {
        navigator.notification.alert(
            message,
            function() { },
            title
        );
    },

    validFields: function() {
        return (app.username != "" && app.password != "");
    },

    sync: function () {
        tt.stopTimer();
        tt.syncTokenAndTime();
    },

    showTimer: function(time) {
        var now = new Date(time.timestamp * 1000);
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        // Add a zero in front of numbers < 10.
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        if (app.el("time") != undefined && !isNaN(h)) {
            app.el("time").innerHTML = h + ":" + m + ":" + s;
        }
    },

    getUserData: function() {
        app.username =  (app.rememberMe()) ?
                        localStorage.username : app.encrypt(app.el("username").value);

        app.password =  (app.rememberMe()) ?
                        localStorage.password : app.encrypt(app.el("password").value);

    },

    getUserFullName: function() {
        return localStorage.fullName;
    },

    getLastRecord: function() {
        return localStorage.lastRecord;
    },

    bindScreenEvents: function() {
        app.el("drawer-icon").onclick = function() {
            if (app.snapper.state().state == "closed") {
                app.snapper.open('left');    
            }
            else {
                app.snapper.close();
            }
        }

        var snap_items = document.getElementsByClassName('snap-item');
        for (var i = 0; i < snap_items.length; i++) {
            snap_items[i].addEventListener('click', app.snapClick, false);
        }
    },

    snapClick: function(event) {
        event.preventDefault();
        var request = new XMLHttpRequest();
        request.open("GET", this.getAttribute("href"), false);
        app.screen.previous = app.screen.current;
        app.screen.current = this.getAttribute("href").split(".")[0];

        request.onload = function() {
            var callback_load = app.screen.current + '.load';
            var callback_unload = app.screen.previous ? app.screen.previous + '.unload' : null;

            if (typeof(eval(callback_unload)) === "function") {
                eval(callback_unload + '()');
            }
            app.el("content").innerHTML = this.responseText;

            if (typeof(eval(callback_load)) === "function") {
                eval(callback_load + '()');
            }
        };

        request.send();
        app.snapper.close();
    },

    el: function(id) {
        return document.getElementById(id);
    },

    empty: function(variable) {
        var type = typeof variable;

        switch (type) {
            case "string":
                return (variable === "");
                break;

            case "object":
                return (Object.keys(variable).length === 0);
                break;
        }
    },

    encrypt: function(value) {
        if (value == "") {
            return value;
        }
        var encrypted = CryptoJS.AES.encrypt(value, device.uuid);
        return encrypted.toString(CryptoJS.enc.hex);
    },

    decrypt: function(value) {  
        if (value == "") {
            return value;
        }
        var decrypted = CryptoJS.AES.decrypt(value, device.uuid);
        return decrypted.toString(CryptoJS.enc.Utf8);
    },

    "parseJSON": function(string) {
        return eval('new Object(' + string + ')');
    },

    "serviceUrl": function(serviceName) {
        return this.config.basePath + this.config.services[serviceName];
    },

    "handleDates": function(elm, options) {
        event.stopPropagation();
        var currentField = $(elm);
        var opts = options || {};
        var minVal = opts.min || 0;
        var maxVal = opts.max || 0;
        var callback = opts.callback || function() {};

        var myNewDate = Date.parse(currentField.val()) || new Date();
        if (typeof myNewDate === "number") {
            myNewDate = new Date(myNewDate);
        }

        window.plugins.datePicker.show({
            date : myNewDate,
            mode : "date",
            minDate: Date.parse(minVal),
            maxDate: Date.parse(maxVal)
        }, callback);
    },

    "loop": function(func, wait, times) {
        var interv = function(w, t){
            return function(){
                if(typeof t === "undefined" || t-- > 0){
                    setTimeout(interv, w);
                    try{
                        func.call(null);
                    }
                    catch(e){
                        t = 0;
                        throw e.toString();
                    }
                }
            };
        }(wait, times);

        setTimeout(interv, wait);
    }
};
