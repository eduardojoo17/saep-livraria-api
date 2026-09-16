import request from 'supertest'
import {Editora} from '../../src/models/editora';
import { AppDataSource } from '../../src/db/dataSource';
import app from '../../src/app'

beforeAll(async () => {
    await AppDataSource.initialize();
});
afterAll(async () => {
    await AppDataSource.destroy();
});

describe('rotas de editora', () => {
    
    it("get / editoras devolve status 200",async()=>{
        const req = await request(app).get('/editoras')
        expect(req.status).toBe(200)
    })
    it("get /editoras retorna 7 elementos",async()=>{
           const req = await request(app).get('/editoras')
           expect(req.body).toHaveLength(25)
    })
    it("get /editoras: retorna editora correta",async()=>{
        const res = await request(app).get('/editoras/1')
        expect(res.body.nome ).toBe("Europa-América")
    })
    it("post/editoras cria e retorna 201",async()=>{
        const res = await request(app).post('/editoras').send({
            nome: "editora senai",
            cidade:"Petrópolis",
            email:"editora@senai.com.br"
        })

        expect(res.status).toBe(201)
        expect(res.body).toEqual(expect.objectContaining({
            nome: "editora senai",
            cidade:"Petrópolis",
            email:"editora@senai.com.br"
        }))

    })
    it("put /editoras/:id atualiza e retorna 200",async()=>{
        const res = await request(app).put('/editoras/18').send({
            cidade:"Rio de Janeiro"
    } )
} )


    it("delete /editoras/:id deleta e retorna 204",async()=>{

    })

})