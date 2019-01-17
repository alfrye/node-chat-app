var moment = require('moment');


var someTime = new Date().getTime();
console.log(someTime);

var someTime2 = moment().valueOf();
console.log(someTime2);

var date = moment();
console.log(date.format('h:mm a'));