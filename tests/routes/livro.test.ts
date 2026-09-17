import { AppDataSource } from "../../src/db/dataSource";
import app from '../../src/app'
import request from 'supertest';

beforeAll(async () => {
    await AppDataSource.initialize();
});
afterAll(async () => {
    await AppDataSource.destroy();
});



describe("Testes Livros",()=>{
    interface inLivro {
        id:number,
        titulo:string,
        paginas:number
    }
   test('GET /livros → deve retornar status 200 e uma lista com 5 livros',async()=>{
        const res = await request(app).get('/livros');
        expect(res.status).toBe(200)
        const livros: inLivro[] =res.body

        const titulos = livros.map((livro)=> livro.titulo)
        expect(titulos).toEqual(["O Hobbit","O Silmarillion","O Feiticeiro de Terramar","Os Despossuídos","Memórias Póstumas de Brás Cubas"])

        

   });
    test('GET /livros/1 → deve retornar status 200 e o livro com titulo "O Hobbit"',async()=>{
        const res = await request(app).get('/livros/1');
        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            "autor_id": 1,"created_at": "2026-09-09T21:28:01.657Z","editora_id": 1,"id": 1,"paginas": 230,"titulo": "O Hobbit","updated_at": "2026-09-09T21:28:01.657Z"
        })


    });
    test('GET /livros/999 → deve retornar status 404 quando o livro não for encontrado',async()=>{
        const res = await request(app).get('/livros/999');
                expect(res.status).toBe(404)
 
    });
    test('POST /livros → deve retornar status 201 e o id no corpo ao enviar um livro válido',async()=>{
        const res = await request(app).post('/livros').send({
            titulo:"livro teste",
            paginas:20,
            autor_id:1,
            editora_id: 1
        })
        expect(res.status).toBe(201)
        expect(res.body).toEqual(expect.objectContaining({
            titulo:"livro teste",
            paginas:20
        }))
           
    });
    test('POST /livros → deve retornar status 400 ao enviar body vazio',async()=>{
                const res = await request(app).post('/livros').send({})
            expect(res.status).toBe(400)
    });
    test('POST /livros → deve retornar status 400 ao enviar autor_id inexistente (999)',async()=>{
          const res = await request(app).post('/livros').send({autor_id:99})
                    expect(res.status).toBe(400)

    });
    test('POST /livros → deve retornar status 400 ao enviar editora_id inexistente (999)',async()=>{
        const res = await request(app).post('/livros').send({editora_id:99})
                    expect(res.status).toBe(400)
    });
    test('POST /livros → deve retornar status 400 ao enviar paginas = 0',async()=>{
const res = await request(app).post('/livros').send({paginas:0})
                    expect(res.status).toBe(400)

    });
    test('POST /livros → deve retornar status 400 ao enviar paginas negativas',async()=>{
        const res = await request(app).post('/livros').send({paginas:-2})
                    expect(res.status).toBe(400)
    });
    test('PUT /livros/1 → deve retornar status 200 ao atualizar paginas de um livro existente',async()=>{
    const res = await request(app).put('/livros/1').send({
        paginas:500
    })
    expect(res.status).toBe(200)

    });
    test('PUT /livros/999 → deve retornar status 404 ao tentar atualizar livro inexistente',async()=>{
            const res = await request(app).put('/livros/999').send({
   paginas:400
    })
    expect(res.status).toBe(404)
    });
    test('DELETE /livros/5 → deve retornar status 204 ao excluir um livro existente',async()=>{
        const res = await request(app).delete('/livros/3')
    expect(res.status).toBe(204)
    });
    test('DELETE /livros/999 → deve retornar status 404 ao tentar excluir livro inexistente',async()=>{
         const res = await request(app).delete('/autores/999')
        expect(res.status).toBe(404)
    });


})