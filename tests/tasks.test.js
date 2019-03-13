// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
const app = require('../app.js');
const helpers = require('./helpers');

// Configure chai
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Tasks", () => {
    describe("GET /tasks", () => {

        // Test to get all students record
        it("should get all of the users tasks", (done) => {
            chai.request(app)
                .get('/tasks/1')
                .end((err, res) => {
                    const body = res.body;
                    const payload = res.body.payload;
                    res.should.have.status(200);
                    body.should.be.a('object');
                    body.should.have.property("date").and.equal(helpers.getTodaysDate());
                    body.should.have.property("date");
                    done();
                });
        });

        // Test to get all students record
        it("should get all of the users tasks", (done) => {
            chai.request(app)
                .get('/tasks/1')
                .end((err, res) => {
                    const body = res.body;
                    const payload = res.body.payload;
                    res.should.have.status(200);
                    body.should.be.a('object');
                    body.should.have.property("date").and.equal(helpers.getTodaysDate());
                    done();
                });
        });

    });
});