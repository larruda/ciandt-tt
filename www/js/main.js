var main = {

    load: function() {
        this.showForm();
    },

    bindEvents: function() {
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
        app.sync();
    }

};