import {expect} from 'chai';
import server from '../src/index';
import {describe, it } from 'mocha';
import request from 'supertest';

describe('Badges ', function() {
    let badgeName = 'my-badge';

    it('create/update and returns a badge data', function(done) {
        request(server) .post('/badges/set')
            .send({
                badgeName: badgeName,
                label: 'version',
                message: '1.0.0',
                style: 'plastic',
                labelColor: 'green',
                color: 'gray'
            })
            .set('Accept', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.Message).to.have.string('ok');
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
            .end(function(err, res) {
                expect(res.statusCode).to.equal(200);
                expect(res.body.Message).to.have.string('ok');
                expect('Content-Type', /json/);
                done();
            });
    });

    it('try to delete a fake badge', function(done) {
        request(server) .delete('/badges/' + badgeName)
            .set('Accept', 'application/json')
            .end(function(err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            });
    });

});
