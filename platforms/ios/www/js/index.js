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
        app.showForm();

        document.getElementById("check-button").onclick = function() {
            if (!app.isOnline()) {
                app.notify("No connection", "Please verify your internet connection.");
                return;
            }

            app.getUserData();

            if (!app.validFields()) {
                app.notify("Warning", "Enter both username and password.");
                return;
            }
            spinnerplugin.show();

            try {
                tt.checkInOrOut();
                app.rememberMe(true);
                app.notify("Success", tt.response);
            } catch(e) {
                app.notify("Error", e.message);
            } finally {
                spinnerplugin.hide();
            }
        }
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
            window.localStorage.username = tt.username;
            window.localStorage.password = tt.password;
            window.localStorage.lastRecord = tt.time;
        }

        return (window.localStorage.remember != undefined);
    },

    notify: function(title, message) {
        navigator.notification.alert(
            message,
            function() { },
            title
        );
    },

    validFields: function() {
        return (tt.username != "" && tt.password != "");
    },

    showForm: function() {
      if (!app.rememberMe()) {
          document.querySelectorAll(".content")[0].style.display = "block";
      }
      app.setTimer();
    },

    setTimer: function () {
        var clockDOM = "";
        //var time = app.getElementByXpath("//p[@id='relogio']"")
    },

    getUserData: function() {
        tt.username =  (window.localStorage.remember) ?
                        window.localStorage.username : document.getElementById("username").value;

        tt.password =  (window.localStorage.remember) ?
                        window.localStorage.password : document.getElementById("password").value;

        tt.time = document.getElementById("time").value;
    }
};
