import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AlunosComponent } from './features/alunos/alunos.component';
import { AlunosCadastroComponent } from './features/alunos-cadastro/alunos-cadastro.component';
import { DisciplinasComponent } from './features/disciplinas/disciplinas.component';
import { MainLayoutComponent } from './app.layout'; 

export const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'alunos', component: AlunosComponent },
      { path: 'aluno', component: AlunosCadastroComponent },
      { path: 'disciplinas', component: DisciplinasComponent },
    ],
  },
];