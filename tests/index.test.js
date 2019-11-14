import {expect} from 'chai';
import cfg from '../src/config/config';
import server from '../src/index';
import mocha from 'mocha';
//console.log(server)

mocha.describe('Server', ()=>{
    mocha.it('tests that server is running on correct port', async() => {
        expect(server.port).to.equal(parseInt(cfg.PORT));
    });
});
