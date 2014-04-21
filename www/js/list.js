
var report = {

    "monitorStatus": false,
    "monitor": null,
    "hwd": null,
    "month": null,
    "year": null,

    "generate": function() {
        this.createReport();
        this.startReport();
        report.monitor = setInterval(function() {
            report.processMonitoring();
            if (report.monitorStatus == "finalizedwithoutinfo" ||  report.monitorStatus == true) {
                report.disposeProcess();
                report.open();
                report.stopMonitoring();
            }
        }, 1000);
    },
    
    "load": function() {
        this.monitorStatus = false;
        this.monitor = null;
        this.hwd = null;
        this.month = null;
        this.year = null;
    },

    "open": function() {
        window.open(report.getReportFileUrl(), '_blank', 'location=no');
    },

    "createReport": function() {
        var params = {
            "reportId": 10012,
            "sessionID": tt.auth.data.SessionID,
            "selectedEmployee": 4052,
            "selectedCandidate": 0,
            "selectedVacancy": 0,
            "dtFmt": "d/m/Y",
            "tmFmt": "H:i:s",
            "shTmFmt": "H:i",
            "dtTmFmt": "d/m/Y H:i:s",
            "language": 0,
            "userName": tt.auth.data.userName,
            "rnd": "",
            "versionDispatcher": "32767.32767.32767.32767",
            "dateVersionDispatcher": "3/7/2014 1:31:58 PM",
            "employeeUserNameLogged": tt.auth.data.selectedEmployeeName,
        };

        $.get(app.serviceUrl('CreateReport'), params, function(data) {
            data = app.parseJSON(data);
            report.hwd = data.hwd;
        });
    },

    "startReport": function() {
        var params = {
            "hwd": this.hwd,
            "ReportID": 10012,
            "LogTransacao": 0,
            "sessionID": tt.auth.data.SessionID,
            "selectedEmployee": tt.auth.data.selectedEmployee,
            "selectedCandidate": 0,
            "selectedVacancy": 0,
            "dtFmt": "d/m/Y",
            "tmFmt": "H:i:s",
            "shTmFmt": "H:i",
            "dtTmFmt": "d/m/Y H:i:s",
            "language": 0,
            "userName": tt.auth.data.userName,
            "rnd": "", //2014-04-16T22:58:33
            "versionDispatcher": "32767.32767.32767.32767",
            "dateVersionDispatcher": "3/7/2014 1:31:58 PM",
            "employeeUserNameLogged": tt.auth.data.selectedEmployeeName,
            "Mês": this.month,
            "Ano": this.year,
            "Horario": "",
            "CentroCusto": "",
            "Cargo": "",
            "MaoDeObra": "",
            "ConScope": 0,
            "LogTransacao": 0,
            "Apresenta Qtd em Centesimal": 0
        };

        var date = new Date();
        params.rnd = date.toISOString().substring(0, 19);

        $.post(app.serviceUrl('StartReport'), params, function(data) {
            data = app.parseJSON(data);
            this.success = data.success;
        });
    },

    "processMonitoring": function() {
        var params = {
            "hwd": 20904,
            "mnthwd": 0,
            "sessionID": tt.auth.data.SessionID,
            "selectedEmployee": 4052,
            "selectedCandidate": 0,
            "selectedVacancy": 0,
            "dtFmt": "d/m/Y",
            "tmFmt": "H:i:s",
            "shTmFmt": "H:i",
            "dtTmFmt": "d/m/Y H:i:s",
            "language": 0,
            "userName": tt.auth.data.userName,
            "rnd": "",
            "versionDispatcher": "32767.32767.32767.32767",
            "dateVersionDispatcher": "3/7/2014 1:31:58 PM",
            "employeeUserNameLogged": tt.auth.data.selectedEmployeeName,
        };

        var date = new Date();
        params.rnd = date.toISOString().substring(0, 19);

        $.get(app.serviceUrl('ProcessMonitoring'), params, function(process) {
            process = app.parseJSON(process);
            report.monitorStatus = (process.hasOwnProperty('state')) ? process.state : process.success;
        });
        return report.monitorStatus;
    },

    "stopMonitoring": function() {
        clearInterval(this.monitor);
        this.monitor = null;
    },

    "disposeProcess": function() {
        var params = {
            "hwd": 20904,
            "sessionID": tt.auth.data.SessionID,
            "selectedEmployee": 4052,
            "selectedCandidate": 0,
            "selectedVacancy": 0,
            "dtFmt": "d/m/Y",
            "tmFmt": "H:i:s",
            "shTmFmt": "H:i",
            "dtTmFmt": "d/m/Y H:i:s",
            "language": 0,
            "userName": tt.auth.data.userName,
            "rnd": "",
            "versionDispatcher": "32767.32767.32767.32767",
            "dateVersionDispatcher": "3/7/2014 1:31:58 PM",
            "employeeUserNameLogged": tt.auth.data.selectedEmployeeName,
        };

        $.get(app.serviceUrl('DisposeProcess'), params, function(process) {
            return app.parseJSON(process).success;
        });
    },

    "getReportFileUrl": function() {
        var params = {
            "ReportFile": "R9E67.RAF",
            "sessionId": tt.auth.data.SessionID,
            "language": 0,
            "spoolHandle": null,
            "dummy": "x.pdf"
        };

        return app.serviceUrl('GetReportFile') + '?' + decodeURIComponent($.param(params));
    }
};