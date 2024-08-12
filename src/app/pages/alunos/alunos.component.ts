import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IStudent, StudentService } from '../../shared/services/student.service';
import { CourseService, ICourse } from '../../shared/services/course.service';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


interface IStudentView extends IStudent {
  courseName: string;
}
@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule, 
  ],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
})
export class AlunosComponent implements OnInit {
  students: IStudentView[] = [];
  courses: ICourse[] = [];
  filteredStudents: IStudentView[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.loadStudentData();
  }

  loadStudentData() {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.studentService.getStudents().subscribe((students) => {
        this.students = students.map((student) => {
          const course = this.courses.find((dbCourse) => dbCourse.id === student.courseId);          
          return {
            ...student,
            courseName: course ? course.name : 'Curso não encontrado',
          };
        });
        this.filteredStudents = [...this.students];
      });
    });    
  }

  onSearch() {
    if (this.searchTerm) {
      this.filteredStudents = this.students.filter(
        (student) =>
          student.fullName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  onInsert() {
    this.router.navigate(['/aluno']);
  }

  onEdit(student: IStudent) {
    this.router.navigate(['/aluno'], { queryParams: { id: student.id } });
  }

  onDelete(student: IStudent) {
    const confirmation = confirm('Quer mesmo excluir este aluno?');
    if (confirmation && student.id) {
      this.studentService.deleteStudent(student.id).subscribe(() => {
        this.loadStudentData();
      });
    }
  }
}
