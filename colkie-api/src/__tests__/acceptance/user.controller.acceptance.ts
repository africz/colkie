import { Client, expect } from '@loopback/testlab';
import { ColkieApplication } from '../../application';
import { setupApplication } from './test-helper';
import * as constants from '../../constants';
import * as errors from '../../errors';
import { log } from '../../helpers/logger';
import { getFunc } from '../../helpers/getfunc';
import config from '../../config.json';
import { Context } from 'mocha';   


describe('UserController', () => {
    let app: ColkieApplication;
    let client: Client;
    let username:string;
    let password:string;
    let fileName:string;
    let test:any;

    before('setupApplication', async () => {
        ({ app, client } = await setupApplication());
        username=config.test.username;
        password=config.test.username;
        fileName = 'user.controller.acceptance.ts';

    });

    after(async () => {
        await app.stop();
    });

    it('/user/authUser success', async () => {
        const func = await getFunc('/user/authUser success', fileName);
        const postRes = await client
            .post(constants.A_AUTH_USER)
            .send({ username: username, password: password })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        log.trace(func, 'postRes:', postRes);
        log.trace(func, 'postRes.body:', postRes.body);
        const result = postRes.body;
        log.debug(func, 'result:', result);
        expect(result.message).to.have.property('userId').is.not.empty;
        expect(result.message).to.have.property('username').is.equal(username);
    });

    it('/user/authUser invalid username', async () => {
        const func = await getFunc('/user/authUser invalid username', fileName);
        const postRes = await client
            .post(constants.A_AUTH_USER)
            .send({ username: `${username}false`, password: password })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        log.trace(func, 'postRes:', postRes);
        log.trace(func, 'postRes.body:', postRes.body);
        const result = postRes.body;
        log.debug(func, 'result:', result);
        expect(result.message).is.equal(errors.USER_NOT_EXISTS);
    });

    it('/user/authUser invalid password', async () => {
        const func = await getFunc('/user/authUser invalid password', fileName);
        const postRes = await client
            .post(constants.A_AUTH_USER)
            .send({ username: `${username}`, password: `${password}oooo` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        log.trace(func, 'postRes:', postRes);
        log.trace(func, 'postRes.body:', postRes.body);
        const result = postRes.body;
        log.debug(func, 'result:', result);
        expect(result.message).is.equal(errors.PASSWORD_NOT_MATCH);
    });

    it('/user/authUser username is long', async () => {
        const func = await getFunc('/user/authUser username is long', fileName);
        const postRes = await client
            .post(constants.A_AUTH_USER)
            .send({ username: "1234567890123456789012", password: `${password}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        log.trace(func, 'postRes:', postRes);
        log.trace(func, 'postRes.body:', postRes.body);
        const result = postRes.body;
        log.debug(func, 'result:', result);
        log.debug(func, 'result.message', result.message);
        expect(result.message).is.equal(errors.STRING_LENGTH_LONG);
    });

    it('/user/authUser username is empty', async () => {
        const func = await getFunc('/user/authUser username is empty', fileName);
        const postRes = await client
            .post(constants.A_AUTH_USER)
            .send({ username: "", password: `${password}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);

        log.trace(func, 'postRes:', postRes);
        log.trace(func, 'postRes.body:', postRes.body);
        const result = postRes.body;
        log.debug(func, 'result.message:', result.message);
        expect(result.message).is.equal(errors.STRING_EMPTY_NOT_ALLOWED);
    });

    it('/user/authUser username is null', async () => {
        const func = await getFunc('/user/authUser username is null', fileName);
        const postRes = await client
            .post(constants.A_AUTH_USER)
            .send({ username: null, password: `${password}` })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422);

    });

});
