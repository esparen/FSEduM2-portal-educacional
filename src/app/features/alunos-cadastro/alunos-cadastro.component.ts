import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alunos-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './alunos-cadastro.component.html',
  styleUrl: './alunos-cadastro.component.scss',
})
export class AlunosCadastroComponent {
  registrationForm: FormGroup;
  courses: string[] = ['Matemática', 'Biologia', 'História', 'Informática'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      course: ['', Validators.required],
    });
  }

  get fullName() {
    return this.registrationForm.get('fullName')!;
  }

  get cpf() {
    return this.registrationForm.get('cpf')!;
  }

  get email() {
    return this.registrationForm.get('email')!;
  }

  get phone() {
    return this.registrationForm.get('phone')!;
  }

  get course() {
    return this.registrationForm.get('course')!;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Dados do usuário:', this.registrationForm.value);
      localStorage.setItem('studentData', JSON.stringify(this.registrationForm.value));

      alert('Usuário salvo com sucesso');

      // Redireciona para a tela de listagem de usuários
      this.router.navigate(['/alunos']);
    }
  }
}
