var plague = require('../');
var test = require('tape')

//
// Register
//
test('testing register method', function(t) {
    var randomUser = {
        email: guid() + '@gmail.com',
        password: guid(),
        name: guid()
    }
    plague.register(randomUser.email, randomUser.password, randomUser.name, function(res) {
        if (res.error) {
            t.error(user.error, 'unable to create new user');
            return;
        }
        t.ok(res, 'user created');
        t.end();
        //
        // Login
        //
        t.test('testing login method', function(t) {
            plague.login(randomUser.email, randomUser.password, function(res) {
                if (res.error) {
                    t.error(user.error, 'unable to login');
                    return;
                }
                t.ok(res, 'login ok');
                t.end(res.error);
                //
                // Create Post
                //
                t.test('testing postText method', function(t) {
                    var postText = 'Hello Plague =)';
                    plague.postText(postText, function(res) {
                        t.equal(res.status, 'OK');
                        t.end(res.error);
                        //
                        // Get Posts
                        //			  	
                        t.test('testing getPosts method', function(t) {
                            plague.getPosts(function(res) {
                                var posts = res.posts;
                                t.equal(posts.length, 1);
                                t.equal(posts[0] ? posts[0].text : '', postText);
                                t.end(res.error);
                                t.test('testing deletePost method', function(t) {
                                    plague.deletePost(posts[0] ? posts[0].id : 0, function(res) {
                                        plague.getPosts(function(res) {
                                            t.equal(res.posts.length, 0);
                                            t.end(res.error);
                                        });
                                    });
                                })
                            });
                        })
                    });
                })
            });
        });
    });
});




function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + s4() + s4() +
        s4() + s4() + s4() + s4();
}