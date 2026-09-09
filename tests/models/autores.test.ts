import request from 'supertest';
import app from '../src/app';
import { resetarBanco, fecharBanco } from './helpers/db';


beforeEach(async () => { await resetarBanco(); });  // limpa + semeia
afterAll(async () => { await fecharBanco(); });

it('GET /autores devolve 3', async () => {
    const r = await request(app).get('/autores');  // chama a API
    expect(r.status).toBe(200);
    expect(r.body).toHaveLength(3);
});