var expect =  require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMesaage', () =>{
  it('it should generate the correct message object' , ()=> {
   var res =  generateMessage('alan','hello test');
    expect(res.from).toBe('alan');
    expect(res.text).toBe('hello test');
    expect(res.createdAt).toBeA('number');
    
  });
});

describe('generateLocationMessage', () => {
 it('should create the correct location object', () => {
   var from = 'Admin'
   var url = 'https://www.google.com/maps?q=1,1';
    var res = generateLocationMessage('Admin', 1,1);
    expect(res.from).toBe('Admin');
    expect(res.createdAt).toBeA('number');
    expect(res.url).toBe('https://www.google.com/maps?q=1,1');
    expect(res).toInclude({from,url});

 }); 
});