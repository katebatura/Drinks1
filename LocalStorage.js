"use strict"
class LocalStorage {
    constructor() { 
    }
    checkValue(key) {
        if (localStorage[key]) {
            return true
        } else {
            return false
        }
    }
    addValue(key,value) {
        localStorage[key] = value;  
    }
    getValue(key) {
        if (localStorage[key]) {
            return localStorage[key]
        } else {
            return 'нет информации'
        }
    }
    deleteValue(key) {
        if (localStorage[key]) {
            localStorage.removeItem(key);
            return true
        } else {
            return false
        }
    }
    getKeys(text) {
        for ( var i=0; i<localStorage.length; i++ ) {
            var k = localStorage.key(i);
            if (k.indexOf(text) > -1) {
               console.log(k + ';'); 
            }            
          }
    }
    

};




