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
import { CourseService, ICourse } from '../../shared/services/course.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-alunos-cadastro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
  ],
  templateUrl: './alunos-cadastro.component.html',
  styleUrl: './alunos-cadastro.component.scss',
})
export class AlunosCadastroComponent implements OnInit {
  studentForm: FormGroup;
  courses: ICourse[] = [];

  studentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CourseService
  ) {
    this.studentForm = this.fb.group({
      fullName: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      courseId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadCourses();
    this.studentId = this.route.snapshot.queryParamMap.get('id');

    if (this.studentId) {
      this.loadStudent(this.studentId);
    }
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      console.log('Courses loaded:', this.courses);
    });
  }

  loadStudent(id: string): void {
    this.studentService.getStudentById(id).subscribe((student) => {
      this.studentForm.patchValue(student);
      console.log('student', student);
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const student = this.studentForm.value;
      if (this.studentId) {
        student.id = this.studentId;
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

  get courseId() {
    return this.studentForm.get('courseId')!;
  }
}
