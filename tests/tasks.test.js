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


        it("should get a specific task for a user", (done) => {
            chai.request(app)
                .get('/tasks/1')
                .end((err, res) => {
                    const body = res.body;
                    const payload = res.body.payload[0];
                    res.should.have.status(200);
                    body.should.be.a('object');
                    body.should.have.property("date").and.equal(helpers.getTodaysDate());
                    payload.should.have.property("userId");
                    payload.should.have.property("taskName");
                    payload.should.have.property("createdOn");
                    payload.should.have.property("status");
                    payload.should.have.property("_id");
                    payload.should.have.property("subTasks");
                    done();
                });
        });

        it("should create a new task", (done) => {
            chai.request(app)
                .post('/tasks/1')
                .send({taskName: "New task"})
                .end((err, res) => {
                    const body = res.body;
                    const payload = res.body.payload;

                    res.should.have.status(200);
                    body.should.be.a('object');
                    body.should.have.property("date").and.equal(helpers.getTodaysDate());
                    body.should.have.property("payload").and.be.a("object");
                    payload.should.have.property("userId").and.to.equal(1);
                    payload.should.have.property("taskName").and.to.equal("New task");
                    payload.should.have.property("createdOn");
                    payload.should.have.property("status").and.to.equal("in-progress");
                    payload.should.have.property("_id");
                    payload.should.have.property("subTasks").and.to.have.length(0);
                    done();
                });
            after(()=>{
                console.log("Running after");
            })
        });

        it("should create a new sub task", (done) => {
            chai.request(app)
                .post('/tasks/1/5c8a5e625107375eb622be09')
                .send([
                    {
                        "taskName" : "Eggs",
                        "createdOn" : "26/02/19",
                        "status" : "in-progress"
                    },
                    {
                        "taskName" : "Milk",
                        "createdOn" : "26/02/19",
                        "status" : "in-progress"
                    }
                ])
                .end((err, res) => {
                    const body = res.body;
                    res.should.have.status(200);
                    body.should.be.a('object');
                    body.should.have.property("date").and.equal(helpers.getTodaysDate());
                    body.should.have.property("payload").and.be.a("object");
                    done();
                });
        });

        it("update a task for a given user", (done) => {
            chai.request(app)
                .put('/tasks/1/5c8a5e625107375eb622be09')
                .send({
                    taskName: "Go shopping"
                })
                .end((err, res) => {
                    const body = res.body;
                    const payload = res.body.payload;
                    res.should.have.status(200);
                    body.should.be.a('object');
                    body.should.have.property("date").and.equal(helpers.getTodaysDate());
                    body.should.have.property("payload").and.be.a("object");
                    payload.should.have.property("taskName").to.equal("Go shopping");
                    payload.should.have.property("subTasks");
                    payload.should.have.property("_id");
                    payload.should.have.property("userId");
                    payload.should.have.property("createdOn");
                    payload.should.have.property("status");
                    done();
                });
        });

        it("update a sub-task for a given user", (done) => {
            chai.request(app)
                .put('/tasks/1/5c8a5e625107375eb622be09/04eb7570-4662-11e9-8c5f-df0c2f14888c')
                .send({
                    taskName: "New task name"
                })
                .end((err, res) => {
                    const body = res.body;
                    const payload = res.body.payload;
                    res.should.have.status(200);
                    body.should.be.a('object');
                    body.should.have.property("date").and.equal(helpers.getTodaysDate());
                    body.should.have.property("payload").and.be.a("object");
                    payload.should.have.property("taskName").to.equal("Go shopping");
                    payload.should.have.property("subTasks");
                    payload.should.have.property("_id");
                    payload.should.have.property("userId");
                    payload.should.have.property("createdOn");
                    payload.should.have.property("status");
                    done();
                });
        });

    });
});