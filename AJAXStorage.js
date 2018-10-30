'use strict';

var ajaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";

class AJAXStorage {
    constructor() {
        this.info = {};
        this.stringName = 'NOGOVITSYNA_DRINKS';
        this.updatePassword = null;   
        this.key = null;
        this.text  = null;
       
    }
    
    checkValue(key) {
        if (key in this.info) {
            return true
        } else {
            return false
        }
    }
    
    addValue(key, value) {       
        
            this.info[key] = value;

            this.updatePassword = Math.random();
            
            $.ajax(
                {
                    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'LOCKGET', n : this.stringName, p: this.updatePassword },
                    success :  this.AddValueReady.bind(this), error : this.errorHandler.bind(this)
                }            
            );
        
    }

    AddValueReady() {
        var info = this.info;
        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'UPDATE', n : this.stringName, v : JSON.stringify(info), p : this.updatePassword },
            success : (e) => console.log(e, this.info), error : this.errorHandler.bind(this)
            }
        );
    }

    getValue(key) {
        this.key = key;

        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : this.stringName },
                success : this.getValueReady.bind(this), error : this.errorHandler.bind(this)
            }
        );
    }

    getValueReady(callresult) {
        var info = JSON.parse(callresult.result); 
        if (info[this.key]) {
            console.log(this.key + ': ' + info[this.key])
        } else {
            console.log("Информации о " +  this.key + " нет")
        }
    }

    getKeys(text) {
        this.text = text;

        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : this.stringName },
                success : this.getKeysReady.bind(this), error : this.errorHandler.bind(this)
            }
        );
    }

    getKeysReady(callresult) {
        var info = JSON.parse(callresult.result);

        for (var k in info) {
            if ( k.indexOf(this.text) > -1) {
                console.log(k + ';');
            } else {
                console.log('нет информации');
            }
        }
    }

    deleteValue(key){
        this.key = key;

        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : this.stringName },
                success : this.deleteValueReady.bind(this), error : this.errorHandler.bind(this)
            }
        );

    }

    deleteValueReady(callresult){
        var info = JSON.parse(callresult.result);
        
        if (info[this.key]) {
            delete info[this.key];
            this.info = info;
            console.log("Информация о " +  this.key + " удалена")
        } else {
            return console.log("Информации о " +  this.key + " нет")
        }

        
        this.updatePassword = Math.random();
            
        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : this.stringName, p: this.updatePassword },
                success :  this.AddValueReady.bind(this), error : this.errorHandler.bind(this)
            }            
        );
    }

    errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }

}


