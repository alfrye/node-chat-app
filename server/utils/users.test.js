const expect = require('expect');

const { Users } = require('./users');




describe('Users', () => {
    var users;

    beforeEach(() => {

        users = new Users();

        users.users = [
            {
                id: '1',
                name: 'alan',
                 room: 'Node Course'
            },
            { id: '2', 
            name: 'Mike', 
            room: 'React Course' },
            { id: '3', 
            name: 'Steve',
             room: 'Node Course' }
        ]
    });

    it('should add new user', () => {
        var users = new Users();

        var user = { id: '1234', name: 'alan', room: 'The Office Fans' };

        var resUsers = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);


    });

    it('should remove a user', ()=> {
      var id = "3";
       var removedUser = users.removeUser(id);
        console.log('REmoved users', removedUser);
        expect(users.users.length).toBe(2);

    });

    it('should not remove a user', ()=> {
        var id = "5";
       var removedUser = users.removeUser(id);
      //  console.log('REmoved users', removedUser);
        expect(users.users.length).toBe(3);

    });

    it('should find a user', () => {
        var id = '2';
        var user =  users.getUser(id);
        
        expect(user.id).toBe('2');

    });

    it('should not find a user', () => {
        var id = '5';
        var user =  users.getUser(id);
        
        expect(user).toBe(undefined);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['alan','Steve']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');
        expect(userList).toEqual(['Mike']);
    });
});