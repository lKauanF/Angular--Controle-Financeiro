import { Routes } from '@angular/router';
import { GrupoListaComponent } from './componentes/grupo/grupo-lista/grupo-lista.component';
import { HomeComponent } from './componentes/home/home.component';
import { FormularioComponent } from './componentes/pessoas/formulario/formulario.component';
import { ListarComponent } from './componentes/pessoas/listar/listar.component';
import { VisualizarComponent } from './componentes/pessoas/visualizar/visualizar.component';
import { MetasListaComponent } from './componentes/metas/metas-lista/metas-lista.component';



export const routes: Routes = [
  { path: 'pessoas/formulario', component: FormularioComponent },
  { path: '', component: HomeComponent },
  { path: 'pessoas/listar', component: ListarComponent },
  {path: 'pessoas/editar/:id', component: VisualizarComponent},
  {path: 'grupos/listar', component: GruposListComponent},
  {path: 'metas/listar', component: MetaListComponent},
  {path: 'teste', component: GrupoListaComponent}


];
