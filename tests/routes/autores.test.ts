import { AppDataSource } from '../../src/db/dataSource';
import app from '../../src/app'
import request from 'supertest';
import { Livro } from '../../src/models/livro';
import { listarLivros } from '../../src/controllers/livrosController';


beforeAll(async () => {
    await AppDataSource.initialize();
});
afterAll(async () => {
    await AppDataSource.destroy();
});

describe("Rotas de autores",()=>{
test.skip("deve retornar 3 autores e status 200",async()=>{
            const res = await request(app).get('/autores');
            expect(res.body).toHaveLength(7)

})
test("deve retornar um autor e status 200",async()=>{
         const res = await request(app).get('/autores/1');
         expect(res.body.nome).toBe("JRR Tolkien")

})
test("deve pesquisar por id que não existe e retorna status 404",async()=>{
        const res = await request(app).get('/autores/99');
        expect(res.status).toBe(404)
})

test.skip("criar um autor e receber um retorno de status 201 com id no corpo",async()=>{
     const res = await request(app).post('/autores').send({
        nome:"Machado de Assis",
        nacionalidade:"Brasil"
     })
     expect(res.status).toBe(201)
     expect(res.body).toEqual(expect.objectContaining({
        nome:"Machado de Assis",
        nacionalidade:"Brasil"
     }))
     
     
    })
test("com body vazio retornar erro 400",async()=>{
    const res = await request(app).post('/autores').send({})
    expect(res.status).toBe(400)

})

test("mudar a nacionalidade alterar PUT/",async()=>{
    const res = await request(app).put('/autores/1').send({
        nacionalidade:"EUA"
    })
    expect(res.status).toBe(200)
     expect(res.body).toEqual(expect.objectContaining({
        nacionalidade:"EUA"
     }))
})

test("PUT/ alterar nacionalidade de um autor que não existe exibir erro 404",async()=>{
    const res = await request(app).put('/autores/999').send({nacionalidade:"okay"})  
    expect(res.status).toBe(404)
})
test.skip("deletar por id",async()=>{
    const res = await request(app).delete('/autores/3')
    expect(res.status).toBe(204)
})
test("deletar um autor inexistente",async()=>{
    const res = await request(app).delete('/autores/999')
        expect(res.status).toBe(404)
})


interface inLivro {
    id:number,
    titulo:string,
    paginas:number
}

test("exibir dois livros por autor selecionado no id",async()=>{
        const res = await request(app).get('/autores/1/livros')
        expect(res.body).toHaveLength(2)
        const livros: inLivro[] = res.body

        const titulos = livros.map((livro)=>livro.titulo)
        expect(titulos).toEqual(['O Hobbit','O Silmarillion'])
})

})