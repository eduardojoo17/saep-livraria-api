import type { Request, Response } from 'express';
import { AppDataSource } from '../db/dataSource';
import { Livro } from '../models/livro';
import { error } from 'node:console';
import { Editora } from '../models/editora';
import { Autor } from '../models/autor';

const livros = () => AppDataSource.getRepository(Livro);
const editoras = () => AppDataSource.getRepository(Editora);
const autores = () => AppDataSource.getRepository(Autor);


export async function listarLivros(_req: Request, res: Response): Promise<void> {
  res.json(await livros().find({ order: { id: 'ASC' } }));
}

export async function mostrarLivro(req: Request, res: Response): Promise<void> {
  const livro = await livros().findOneBy({ id: Number(req.params.id) });
  if (!livro) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }
  res.json(livro);
}

export async function criarLivro(req: Request, res: Response): Promise<void> {
  const dados = req.body as Partial<Livro>;
  const {paginas} = req.body
  if (!dados.titulo || !dados.paginas || !dados.editora_id || !dados.autor_id) {  res.status(400).json({error:"Campos obrigatorios ausentes"});}
    
  const editoraExist = await editoras().findOneBy({ id: Number(req.params.id) });
    if (!editoraExist ) {
    res.status(400).json({ erro: 'editora não encontrado' });
    }

const autorExist = await autores().findOneBy({ id: Number(req.params.id) });
    if (!autorExist) {
    res.status(400).json({ erro: 'autor não encontrado' });
    }

    if(paginas ===0 || paginas < 0){
          res.status(400).json({ erro: 'numero de paginas não pode ser zero' });
    }

  const livro = livros().create(dados);
  await livros().save(livro);
  res.status(201).json(livro);
}

export async function atualizarLivro(req: Request, res: Response): Promise<void> {
  const repo = livros();
  const livro = await repo.findOneBy({ id: Number(req.params.id) });
  if (!livro) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }
  repo.merge(livro, req.body as Partial<Livro>);
  await repo.save(livro);
  res.json(livro);
}

export async function excluirLivro(req: Request, res: Response): Promise<void> {
  const resultado = await livros().delete(Number(req.params.id));
  if (resultado.affected === 0) {
    res.status(404).json({ erro: 'Livro não encontrado' });
    return;
  }
  res.status(204).send();
}
