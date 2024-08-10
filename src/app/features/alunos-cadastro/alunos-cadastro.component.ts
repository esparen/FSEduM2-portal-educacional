import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../shared/services/student.service';

@Component({
  selector: 'app-alunos-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './alunos-cadastro.component.html',
  styleUrl: './alunos-cadastro.component.scss',
})
export class AlunosCadastroComponent implements OnInit {
  registrationForm: FormGroup;
  courses: string[] = [
    'Matemática',
    'Biologia',
    'História',
    'Informática',
    'Geografia',
    'Português',
    'Física',
    'Química',
    'Ciências',
    'Inglês',
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {
    this.registrationForm = this.fb.group({
      id: [null],
      fullName: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      course: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.studentService.getStudent(id).subscribe((student) => {
          this.registrationForm.patchValue(student);
        });
      }
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const student = this.registrationForm.value;
      if (student.id) {
        this.studentService.setStudent(student).subscribe(() => {
          alert('Aluno atualizado com sucesso');
          this.router.navigate(['/alunos']);
        });
      } else {
        this.studentService.addStudent(student).subscribe(() => {
          alert('Aluno inserido com sucesso');
          this.router.navigate(['/alunos']);
        });
      }
    }
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
}
