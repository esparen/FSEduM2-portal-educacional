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
  studentForm: FormGroup;
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

  studentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      course: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.queryParamMap.get('id');
    console.log('this.studentId', this.route.snapshot);
    if (this.studentId) {
      console.log('vai carregar aluno id', this.studentId);
      this.loadStudent(Number(this.studentId));
    }
  }

  loadStudent(id: number): void {
    console.log('id', id);
    
    this.studentService.getStudentById(id).subscribe((student) => {
      this.studentForm.patchValue(student);
      console.log('student', student);
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const student = this.studentForm.value;
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
    return this.studentForm.get('fullName')!;
  }

  get cpf() {
    return this.studentForm.get('cpf')!;
  }

  get email() {
    return this.studentForm.get('email')!;
  }

  get phone() {
    return this.studentForm.get('phone')!;
  }

  get course() {
    return this.studentForm.get('course')!;
  }
}
