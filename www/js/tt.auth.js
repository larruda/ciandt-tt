tt.auth = {

    "params": {
        "username": "",
        "password": "",
        "NTLMLogin": false,
        "loginAuthenticOnserver": true,
        "sessionID": 0,
        "selectedEmployee": 0,
        "selectedCandidate": 0,
        "selectedVacancy": 0,
        "dtFmt": "d/m/Y",
        "tmFmt": "H:i:s",
        "shTmFmt": "H:i",
        "dtTmFmt": "d/m/Y H:i:s",
        "language": 0
    },

    "data": {},

    "login": function() {
        this.params.username = app.decrypt(app.username);
        this.params.password = app.decrypt(app.password);

        $.post(app.serviceUrl('login'), this.params, function(data) {
            tt.auth.data = app.parseJSON(data);
        });
    }
};