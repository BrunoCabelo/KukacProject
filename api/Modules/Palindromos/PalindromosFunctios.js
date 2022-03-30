const express = require("express");

function verifyPalindromos(inter1, inter2){
    var i = inter1;
    var arr = [];
    for(i; i <= inter2; i++){
        var str = i.toString();
        var strR = str.split('').reverse().join('')
        
        if(str == strR){
            arr.push(str);
        }
        
    }
    return arr;
}

module.exports = {verifyPalindromos};