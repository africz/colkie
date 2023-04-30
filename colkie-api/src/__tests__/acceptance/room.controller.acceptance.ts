import { Client, expect } from '@loopback/testlab';
import { ColkieApplication } from '../../application';
import { getAuthToken, getNextTestValue, setupApplication } from './test-helper';
import * as constants from '../../constants';
import * as errors from '../../errors';
import { log } from '../../helpers/logger';
import { getFunc } from '../../helpers/getfunc';
import config from '../../config.json';
import { addUser, authUser, createUser, sendMessage } from '../../interfaces';


describe('RoomController', () => {
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
        fileName = 'room.controller.acceptance.ts';
        authData = { username: username, password: password };
    });

    after(async () => {
        await app.stop();
    });

    xdescribe('/room/sendMessage', () => {
        it('success', async () => {
            const func = await getFunc('success', fileName);
            const authToken = await getAuthToken(authData, client);
            log.debug(func, 'authToken:', authToken);

            const data: sendMessage = {
                room: 1,
                username: username,
                message: "xx",
                token: authToken
            };
            const postRes = await client
                .post(constants.A_SEND_MESSAGE)
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
    });
    describe('/room/addUser', () => {
        it('success', async () => {
            const func = await getFunc('success', fileName);
            const authToken = await getAuthToken(authData, client);
            log.debug(func, 'authToken:', authToken);
            const nextUser = await getNextTestValue({ username: username, email: email });
            log.debug(func, 'nextUser:', nextUser);
            //create a new text user first to not get duplicate result in the room.
            const userData: createUser = {
                authname: username,
                username: nextUser.username,
                password: password,
                email: nextUser.email,
                firstname: 'Test firstname',
                lastname: 'Test lastname',
                token: authToken
            };
            log.debug(func, 'userData:', userData);
            const userResult = await client
                .post(constants.A_CREATE_USER)
                .send(userData)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200);
            log.debug(func, 'userResult:', userResult);

            expect(userResult.body.message).is.equal(constants.RESULT_SUCCESS);


            const data: addUser = {
                authname: username,
                username: nextUser.username,
                room: 1,
                token: authToken
            };
            const postRes = await client
                .post(constants.A_ADD_USER)
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
        it('invalid room id', async () => {
            const func = await getFunc('success', fileName);
            const authToken = await getAuthToken(authData, client);
            log.debug(func, 'authToken:', authToken);

            const data: addUser = {
                room: 9000,
                authname: username,
                username: username,
                token: authToken
            };
            const postRes = await client
                .post(constants.A_ADD_USER)
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);

            log.trace(func, 'postRes:', postRes);
            log.trace(func, 'postRes.body:', postRes.body);
            const result = postRes.body;
            log.debug(func, 'result:', result);
            expect(result.message).is.equal(errors.ROOM_IS_INVALID);
        })
        it('invalid username', async () => {
            const func = await getFunc('success', fileName);
            const authToken = await getAuthToken(authData, client);
            log.debug(func, 'authToken:', authToken);

            const data: addUser = {
                room: 1,
                authname: username,
                username: "xx",
                token: authToken
            };
            const postRes = await client
                .post(constants.A_ADD_USER)
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);

            log.trace(func, 'postRes:', postRes);
            log.trace(func, 'postRes.body:', postRes.body);
            const result = postRes.body;
            log.debug(func, 'result:', result);
            expect(result.message).is.equal(errors.USER_NOT_EXISTS);
        })
        it('username is empty', async () => {
            const func = await getFunc('success', fileName);
            const authToken = await getAuthToken(authData, client);
            log.debug(func, 'authToken:', authToken);

            const data: addUser = {
                room: 1,
                authname: username,
                username: "",
                token: authToken
            };
            const postRes = await client
                .post(constants.A_ADD_USER)
                .send(data)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(400);

            log.trace(func, 'postRes:', postRes);
            log.trace(func, 'postRes.body:', postRes.body);
            const result = postRes.body;
            log.debug(func, 'result:', result);
            expect(result.message).is.equal(errors.USER_NOT_EXISTS);
        })

    });
});
