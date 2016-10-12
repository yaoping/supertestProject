var config = require('../config/endpoints');
var request = require('supertest')(config.host[config.env]);
var chai = require('chai');
var expect = chai.expect;


describe('Github home page', function () {

    this.timeout(10000);

    it('can access github home page', function (done) {
        request.get('/')
            .expect(200, done);
    });

    it('it can navigate to register page success', function (done) {
        request.get('/join')
            .expect(200, done)

    });
    it('will refuse the request if username have been taken', function (done) {
        request.post('/signup_check/username')
            .type('form')
            .send('{value:yaoping}')
            .expect(403)
            .end(function (err, res) {
                if (err) return done(err)
                expect(res.body).to.equal('Username is already taken')
                done();
            })

    })

});