var expect =  require('expect');

var {generateMessage} = require('./message');

describe('generateMesaage', () =>{
  it('it should generate the correct message object' , ()=> {
   var res =  generateMessage('alan','hello test');
    expect(res.from).toBe('alan');
    expect(res.text).toBe('hello test');
    expect(res.createdAt).toBeA('number');
    
  });
});