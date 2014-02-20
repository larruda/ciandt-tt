/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with tt work for additional information
 * regarding copyright ownership.  The ASF licenses tt file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use tt file except in compliance
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
var tt = {

    params : {
        deviceID: 2,
        eventtype: 1,
        userName: "",
        password: "",
        cracha: "",
        costCenter: "",
        leave: "",
        func: "",
        cdiDispositivoAcesso: 2,
        cdiDriverDispositivoAcesso: 10,
        cdiTipoIdentificacaoAcesso: 7,
        oplLiberarPETurmaRVirtual: false,
        cdiTipoUsoDispositivo: 1,
        qtiTempoAcionamento: 0,
        d1sEspecieAreaEvento: "Nenhuma",
        d1sAreaEvento: "Nenhum",
        d1sSubAreaEvento: "Nenhum(a)",
        d1sEvento: "Nenhum",
        oplLiberarFolhaRVirtual: false,
        oplLiberarCCustoRVirtual: false,
        qtiHorasFusoHorario: 0,
        cosEnderecoIP: "127.0.0.1",
        nuiPorta: 7069,
        oplValidaSenhaRelogVirtual: false,
        useUserPwd: true,
        useCracha: false,
        dttimeEvent: "", // 04/02/2014 21:34:34
        oplLiberarFuncoesRVirtual: false,
        sessionID: 0,
        selectedEmployee: 0,
        selectedCandidate: 0,
        selectedVacancy: 0,
        dtFmt: "d/m/Y",
        tmFmt: "H:i:s",
        shTmFmt: "H:i",
        dttmFmt: "d/m/Y H:i:s",
        language:  0
    },

    request: null,
    response: {},
    time: {},
    thread: null,

    checkInOrOut: function() {
        var params_string = '';

        tt.params.userName = tt.username;
        tt.params.password = tt.password;
        tt.params.dttimeEvent = tt.time;

        for (var key in tt.params) {
            params_string += key + '=' + encodeURIComponent(tt.params[key]) + '&';
        }

        params_string = params_string.substr(0, params_string.length - 1);

        tt.request = new XMLHttpRequest();
        var tt_endpoint = "https://tt.ciandt.com/.net/index.ashx/SaveTimmingEvent";

        tt.request.open("POST", tt_endpoint, false);
        tt.request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        tt.request.onload = function(e) {
            console.log(tt.request);

            if (tt.request.readyState != 4 || tt.request.status != 200) {
                return;
            }

            tt.response = eval("(function(){return " + tt.request.responseText + ";})()");
        };

        tt.request.send(params_string);
    },

    getGMTOffset: function() {
        var date = new Date();
        return -date.getTimezoneOffset() / 60;
    },

    getCurrentTime: function() {
        var ntp_endpoint = "http://monitor.ntp.br/horacerta/s.php";
        var request = new XMLHttpRequest();

        request.open("GET", ntp_endpoint + "?zone=" + tt.getGMTOffset(), true);
        request.responseType = "text";
        request.onload = function(e) {
            if (request.readyState != 4 || request.status != 200) {
                tt.time = false;
                return;
            }
            var arr = request.responseText.split("#");
            tt.time.string = arr[0].trim();
            tt.time.timestamp = arr[1].trim();

            tt.thread = setInterval(function() {
                app.showTimer(tt.time);
                tt.time.timestamp = +tt.time.timestamp + 1;
            }, 1000);
        };

        request.send();
    },

    getReponseMessage: function() {
        if (tt.response == null || !tt.response.hasOwnProperty('success')) {
            return "Unexpected server response.\nPlease try again later.";
        }
        if (tt.response.msg.type == 2 || tt.response.success != true) {
            return tt.response.msg.msg;
        }
    }
};




