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
    remember: false,

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.main();
    },

    initFastClick: function() {
        FastClick.attach(document.body);
    },

    main: function() {
        app.initFastClick();
        app.bindScreenEvents();
        app.showForm();

        app.el("check-button").onclick = function() {
            if (!app.validate()) {
                return;
            }
            
            spinnerplugin.show();

            app.rememberMe(app.el("remember").checked);

            tt.checkInOrOut();
            
            app.notify("Server Response", tt.getReponseMessage());
            
            spinnerplugin.hide();
        }
    },

    validate: function() {
        if (!app.isOnline()) {
            app.notify("No connection", "Please verify your internet connection.");
            return;
        }

        app.getUserData();

        if (!app.validFields()) {
            app.notify("Warning", "Enter both username and password.");
            return;
        }

        if (!tt.time) {
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

    rememberMe: function(store) {
        if (store) {
            window.localStorage.remember = true;
            window.localStorage.username = app.username;
            window.localStorage.password = app.password;
            window.localStorage.lastRecord = tt.time;
        }
        return JSON.parse(window.localStorage.remember);        
    },

    forget: function() {
        window.localStorage.remember = false;
        window.localStorage.username = null;
        window.localStorage.password = null;
        window.localStorage.lastRecord = null;
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

    showForm: function() {
        if (!app.rememberMe()) {
            app.el("auth").style.display = "block";
            app.el("reset").style.display = "none";
        }
        app.setTimer();
    },

    setTimer: function () {
        tt.getNetworkTime();
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

        app.el("time").innerHTML = h + ":" + m + ":" + s;
    },

    getUserData: function() {
        app.username =  (app.rememberMe()) ?
                        window.localStorage.username : app.el("username").value;

        app.password =  (app.rememberMe()) ?
                        window.localStorage.password : app.el("password").value;

    },

    bindScreenEvents: function() {
        app.el("reset").onclick = function() {
            app.el("auth").style.display = "block";
            app.forget();
        };
    },

    el: function(id) {
        return document.getElementById(id);
    }
};
