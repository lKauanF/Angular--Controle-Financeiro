import { Injectable } from '@angular/core';
import { IPessoa } from "./pessoa.types";

@Injectable({providedIn: 'root'})
export class GrupoService {

  constructor() { }
}

export interface IGrupoSalvar{
  id: number | null;
  nome: string;
  descricao: string
  pessoaId: number | null;
}

export interface IGrupoShow{
  id: number | null;
  nome: string;
  descricao: string
  pessoa: IPessoa
  saldo: number
}
