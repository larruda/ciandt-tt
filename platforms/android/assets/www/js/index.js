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
            window.localStorage.lastRecord = tt.time.lastRecord;
            window.localStorage.fullName = tt.response.msg.msg.match("MARCACAO EFETUADA (.*)")[1];

            app.el("auth").style.display = "none";
            app.el("user-data").style.display = "block";

            app.el("full-name").innerHTML = app.getUserFullName();
            app.el("last-record").innerHTML = app.getLastRecord();
        }
        
        if (window.localStorage.remember == undefined) {
            window.localStorage.remember = false;
        }
        return JSON.parse(window.localStorage.remember);
    },

    forget: function() {
        window.localStorage.remember = false;
        window.localStorage.username = null;
        window.localStorage.password = null;
        window.localStorage.lastRecord = null;
        window.localStorage.fullName = null;

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

    showForm: function() {
        if (!app.rememberMe()) {
            app.el("auth").style.display = "block";
            app.el("user-data").style.display = "none";
        }
        else {
            app.el("full-name").innerHTML = app.getUserFullName();
            app.el("last-record").innerHTML = app.getLastRecord();
        }

        app.el("remember").checked = (app.rememberMe()) ? "checked" : false;
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

    getUserFullName: function() {
        return window.localStorage.fullName;
    },

    getLastRecord: function() {
        return window.localStorage.lastRecord;
    },

    bindScreenEvents: function() {
        app.el("forget").onclick = function() {
            app.el("auth").style.display = "block";
            app.forget();
        };

        app.el("check-button").onclick = function() {
            if (!app.validate()) {
                return;
            }
            
            spinnerplugin.show();
            tt.checkInOrOut();
            spinnerplugin.hide();

            app.notify("Server Response", tt.getReponseMessage());
        }
    },

    el: function(id) {
        return document.getElementById(id);
    }
};
