import { expect } from 'chai';
import server from '../src/index';
import { describe, it } from 'mocha';
import request from 'supertest';

describe('Badges ', function() {
    let badgeName = 'my-badge';
    let badgeData = {
        badgeName: badgeName,
        label: 'version',
        message: '1.0.0',
        style: 'plastic',
        labelColor: 'green',
        color: 'gray'
    };
    let authToken = 'APIKEY test';
    let nonExistingAuthToken = 'APIKEY nonExistingAuthToken';

    it('create/update a badge', function(done) {
        request(server).post('/badges/set')
            .send(badgeData)
            .set('Accept', 'application/json')
            .set('authorization', authToken)
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.Message).to.have.string('ok');
                expect('Content-Type', /json/);
                done();
            });
    });

    it('create/update a badge with bad authentication token', function(done) {
        request(server).post('/badges/set')
            .send(badgeData)
            .set('Accept', 'application/json')
            .set('authorization', nonExistingAuthToken)
            .end(function(err, res) {
                expect(res.statusCode).to.equal(403);
                done();
            });
    });

    it('create/update a badge missing data', function(done) {
        request(server).post('/badges/set')
            .send({
                badgeName: badgeName,
                label: 'version'
            })
            .set('Accept', 'application/json')
            .set('authorization', authToken)
            .end(function(err, res) {
                expect(res.statusCode).to.equal(400);
                expect(res.body.Message).to.have.string('missing required data');
                expect('Content-Type', /json/);
                done();
            });
    });

    it('gets a badge in svg', function(done) {
        request(server).get('/badges/' + badgeName)
            .end(function(err, res) {
                expect(res.header['content-type']).to.have.string('svg');
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it('try to get a fake badge', function(done) {
        request(server).get('/badges/nonExistingBadge')
            .end(function(err, res) {
                expect(res.header['content-type']).to.have.string('html');
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('delete a badge', function(done) {
        request(server) .delete('/badges/' + badgeName)
            .set('Accept', 'application/json')
            .set('authorization', authToken)
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.Message).to.have.string('ok');
                expect('Content-Type', /json/);
                done();
            });
    });

    it('try to delete a fake badge', function(done) {
        request(server).delete('/badges/' + badgeName)
            .set('authorization', authToken)
            .end(function(err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

    it('try to delete a badge with bad authentication token', function(done) {
        request(server) .delete('/badges/' + badgeName)
            .set('authorization', nonExistingAuthToken)
            .end(function(err, res) {
                expect(res.statusCode).to.equal(403);
                done();
            });
    });

    it('try to delete a badge not sending authorization header', function(done) {
        request(server) .delete('/badges/' + badgeName)
            .end(function(err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });
});
