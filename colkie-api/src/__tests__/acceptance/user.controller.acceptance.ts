import { Client, expect } from '@loopback/testlab';
import { ColkieApplication } from '../../application';
import { setupApplication } from './test-helper';
import * as constants from '../../constants';
import { log } from '../../helpers/logger';


describe('UserController', () => {
    let app: ColkieApplication;
    let client: Client;

    before('setupApplication', async () => {
        ({ app, client } = await setupApplication());
    });

    after(async () => {
        await app.stop();
    });

    it('/user/authUser success', async () => {
        const func = "authUser"
        const postRes = await client
            .post(constants.A_AUTH_USER)
            .send({ username: "africz", password: "africz" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        log.trace(func, 'postRes:', postRes);
        log.trace(func, 'postRes.body:', postRes.body);
        const result = postRes.body;
        log.debug(func, 'result:', result);
        expect(result.message).to.have.property('userId').is.not.empty;
        expect(result.message).to.have.property('username').is.equal("africz");

    });

    it('/user/authUser fail', async () => {
        const func = "authUser"
        const postRes = await client
            .post(constants.A_AUTH_USER)
            .send({ username: "africzx", password: "africz" })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        log.trace(func, 'postRes:', postRes);
        log.trace(func, 'postRes.body:', postRes.body);
        const result = postRes.body;
        log.debug(func, 'result:', result);

    });

});
