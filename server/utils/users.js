

class Users {
    constructor () {
        this.users = [];
    }

    addUser(id,name,room) {
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
    //      this.users = this.users.filter((user) => {
    //         return this.users.id !== id;
    //   });
     var user = this.getUser(id);
     this.users = this.users.filter((user) => {
                 return user.id !== id;
           });
     return user;
    //   var index = this.users.findIndex(obj => obj.id === id);
    //   console.log(index);
    //   if(index > -1) 
    //   {
    //    var x =  this.users.splice(index, 1);
    //     return x;
    //   }
    }

    getUser(id) {
        return this.users.filter((user) => {
              return user.id === id;
        })[0];

       
    } 

    getUserList(room) {
        var users =  this.users.filter((user) => {
            return user.room === room;
        });

        var namesArray = users.map((user) => {
             return user.name;
        });
         
        console.log('User List:', namesArray);
        return namesArray;
    }
}

module.exports = {Users};


// class Person {
//     constructor(name,age) {
//          this.name = name;
//          this.age = age;
//     }
// }

// var me = new Person('alan', 23);

// console.log('this,name', me.name);
// console.log('this.age', me.age);

// var me = new Person('bill', 50);

// console.log('this,name', me.name);
// console.log('this.age', me.age);

