import { Client, expect } from '@loopback/testlab';
import { ColkieApplication } from '../../application';
import { getAuthToken, getNextTestValue, setupApplication } from './test-helper';
import * as constants from '../../constants';
import * as errors from '../../errors';
import { log } from '../../helpers/logger';
import { getFunc } from '../../helpers/getfunc';
import config from '../../config.json';
import { authUser, createUser } from '../../interfaces';


describe('UserController', () => {
    let app: ColkieApplication;
    let client: Client;
    let username: string;
    let password: string;
    let email: string;
    let fileName: string;
    let authData: authUser;


    before('setupApplication', async () => {
        ({ app, client } = await setupApplication());
        username = config.test.username;
        password = config.test.password;
        email = 'test@test.com';
        fileName = 'user.controller.acceptance.ts';
        authData = { username: username, password: password };
    });

    after(async () => {
        await app.stop();
    });
    xdescribe('/user/authUser', () => {
        it('success', async () => {
            const func = await getFunc('success', fileName);
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

        it('invalid username', async () => {
            const func = await getFunc('invalid username', fileName);
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

        it('invalid password', async () => {
            const func = await getFunc('invalid password', fileName);
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

        it('username is long', async () => {
            const func = await getFunc('username is long', fileName);
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

        it('username is empty', async () => {
            const func = await getFunc('username is empty', fileName);
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

        it('username is null', async () => {
            const func = await getFunc('username is null', fileName);
            const postRes = await client
                .post(constants.A_AUTH_USER)
                .send({ username: null, password: `${password}` })
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(422);

        });
    });

    xdescribe('/user/createUser', () => {
        it('success', async () => {
            const func = await getFunc('success', fileName);
            const authToken = await getAuthToken(authData, client);
            log.debug(func, 'authToken:', authToken);
            const nextUser = await getNextTestValue({ username: username, email: email });
            log.debug(func, 'nextUser:', nextUser);

            const data: createUser = {
                authname: username,
                username: nextUser.username,
                password: password,
                email: nextUser.email,
                firstname: 'Test firstname',
                lastname: 'Test lastname',
                token: authToken
            };
            const postRes = await client
                .post(constants.A_CREATE_USER)
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);

            log.trace(func, 'postRes:', postRes);
            log.trace(func, 'postRes.body:', postRes.body);
            const result = postRes.body;
            log.debug(func, 'result:', result);
            expect(result.message).is.equal(constants.RESULT_SUCCESS);
        })
        it('username long', async () => {
            const func = await getFunc('success', fileName);
            const authToken = await getAuthToken(authData, client);
            log.debug(func, 'authToken:', authToken);
            const nextUser = await getNextTestValue({ username: username, email: email });
            log.debug(func, 'nextUser:', nextUser);

            const data: createUser = {
                authname: username,
                username: `${nextUser.username}123456789012345678901`,
                password: password,
                email: nextUser.email,
                firstname: 'Test firstname',
                lastname: 'Test lastname',
                token: authToken
            };
            const postRes = await client
                .post(constants.A_CREATE_USER)
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);

            log.trace(func, 'postRes:', postRes);
            log.trace(func, 'postRes.body:', postRes.body);
            const result = postRes.body;
            log.debug(func, 'result:', result);
            expect(result.message).is.equal(errors.STRING_LENGTH_LONG);
        });
        it('username empty', async () => {
            const func = await getFunc('success', fileName);
            const authToken = await getAuthToken(authData, client);
            log.debug(func, 'authToken:', authToken);
            const nextUser = await getNextTestValue({ username: username, email: email });
            log.debug(func, 'nextUser:', nextUser);

            const data: createUser = {
                authname: username,
                username: "",
                password: password,
                email: nextUser.email,
                firstname: 'Test firstname',
                lastname: 'Test lastname',
                token: authToken
            };
            const postRes = await client
                .post(constants.A_CREATE_USER)
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);

            log.trace(func, 'postRes:', postRes);
            log.trace(func, 'postRes.body:', postRes.body);
            const result = postRes.body;
            log.debug(func, 'result:', result);
            expect(result.message).is.equal(errors.STRING_EMPTY_NOT_ALLOWED);
        });
    });
});
