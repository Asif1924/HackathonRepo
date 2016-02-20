/* author Keith Evetts 2009 License: LGPL  

set: once set may not be altered - console error is generated
  global function SETCONST(String name, Object value)
retrieve:  
  global function CONST(String name)  

*/
(function(){
  var constants = {};
  self.SETCONST = function(name, value) {  
      if (typeof name !== 'string') { throw new Error('constant name is not a string'); }  
      if (!value) { throw new Error('no value supplied for constant ' + name); }
      else if (name in constants) { throw new Error('constant ' + name + ' is already defined'); }   
      else {
          constants[name] = value;   
          return true;
    }
  };
  self.CONST = function(name) {  
      if (typeof name !== 'string') { throw new Error('constant name is not a string'); }  
      if (name in constants) { return constants[name]; }
      else { throw new Error('constant ' + name + ' has not been defined'); }  
  };
}());
