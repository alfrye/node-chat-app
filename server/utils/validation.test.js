const expect = require('expect');

const {isRealString} = require('./validation');


describe('isRealString', () => {
  it('shoild reject non-string values', ()=> {
      var str = 125;
      expect(isRealString(str)).toBeFalsy();
  });

  it('should reject strings with only spaces', () => {
       var str = "      ";
       expect(isRealString(str)).toBeFalsy();
  });

  it('should allow strings with non-space characters', () => {
      var str =  "  hello there  ";

      expect(isRealString(str)).toBe(true);
  });
});