import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AlunosComponent } from './features/alunos/alunos.component';
import { AlunosCadastroComponent } from './features/alunos-cadastro/alunos-cadastro.component';
import { DisciplinasComponent } from './features/disciplinas/disciplinas.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'alunos', component: AlunosComponent },
  { path: 'alunos/cadastro', component: AlunosCadastroComponent },
  { path: 'disciplinas', component: DisciplinasComponent },
];
