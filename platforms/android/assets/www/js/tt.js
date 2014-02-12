var params = {
        "deviceID" : 2,
        "eventType" : 1,
        "userName" : "lucas",
        "password" : "",
        "cracha" : "",
        "costCenter" : "",
        "leave" : "",
        "func" : "",
        "cdiDispositivoAcesso" : 2,
        "cdiDriverDispositivoAcesso" : 10,
        "cdiTipoIdentificacaoAcesso" : 7,
        "oplLiberarPETurmaRVirtual" : false,
        "cdiTipoUsoDispositivo" : 1,
        "qtiTempoAcionamento" : 0,
        "d1sEspecieAreaEvento" : "Nenhuma",
        "d1sAreaEvento" : "Nenhum",
        "d1sSubAreaEvento" : "Nenhum(a)",
        "d1sEvento" : "Nenhum",
        "oplLiberarFolhaRVirtual" : false,
        "oplLiberarCCustoRVirtual" : false,
        "qtiHorasFusoHorario" : 0,
        "cosEnderecoIP" : "127.0.0.1",
        "nuiPorta" : 7069,
        "oplValidaSenhaRelogVirtual" : false,
        "useUserPwd" : true,
        "useCracha" : false,
        "dtTimeEvent" : "04/02/2014 21:34:34",
        "oplLiberarFuncoesRVirtual" : false,
        "sessionID" : 0,
        "selectedEmployee" : 0,
        "selectedCandidate" : 0,
        "selectedVacancy" : 0,
        "dtFmt" : "d/m/Y",
        "tmFmt" : "H:i:s",
        "shTmFmt" : "H:i",
        "dtTmFmt" : "d/m/Y H:i:s",
        "language" :  0
      };

      var params_string = '';

      for (var key in params) {
        params_string += key + '=' + encodeURIComponent(params[key]) + '&';
      }

      params_string = params_string.substr(0, params_string.length - 1);

      var request = new XMLHttpRequest();

      request.open("POST", "https://tt.ciandt.com/.net/index.ashx/SaveTimmingEvent", true);
      request.responseType = "text";
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      request.onload = function(e) {
        var response = eval("(function(){return " + request.response + ";})()");

        if (response.success == true) {
          alert(response.msg.msg);
        }
      }

      request.send(params_string);
