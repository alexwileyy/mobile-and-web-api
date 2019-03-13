// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const app = require('../app.js');

// Configure chai
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Users", () => {
    describe("GET /users", () => {

        // Test to get all students record
        it("should get all users records", (done) => {
            chai.request(app)
                .get('/users/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("date").and.equal("Wed Mar 13 2019");
                    done();
                });
        });

        // Test to get all students record
        it("should get all user by user id", (done) => {
            chai.request(app)
                .get('/users/1')
                .end((err, res) => {
                    const user = res.body.payload[0];

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property("payloadLength").and.equal(1);
                    user.should.have.property("userId");
                    user.should.have.property("name");
                    user.should.have.property("age");
                    user.should.have.property("address");
                    user.should.have.property("postcode");
                    done();
                });
        });

    });
});