import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { AlunosCadastroComponent } from './pages/alunos-cadastro/alunos-cadastro.component';
import { DisciplinasComponent } from './pages/disciplinas/disciplinas.component';
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