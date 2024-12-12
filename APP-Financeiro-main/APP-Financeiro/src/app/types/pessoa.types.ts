import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class PessoaService {

  constructor() { }
}

export interface IPessoa {
  id: number | null;
  nome: string;
  cpf: string ;
  email:string;
  telefone:string;
}
