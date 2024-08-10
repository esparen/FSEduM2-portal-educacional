import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IStudent, StudentService } from '../../shared/services/student.service';

@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
})
export class AlunosComponent implements OnInit {
  students: IStudent[] = [];
  filteredStudents: IStudent[] = [];
  searchTerm: string = '';

  constructor(
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
      this.filteredStudents = [...this.students];
    });
  }

  onSearch() {
    if (this.searchTerm) {
      this.filteredStudents = this.students.filter(
        (student) =>
          student.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  onEdit(student: IStudent) {
    // Navegar para a tela de cadastro com os dados do aluno
    //this.router.navigate(['/register'], { queryParams: { id: student.id } });
  }

  onDelete(student: IStudent) {
    const confirmation = confirm('Quer mesmo excluir este aluno?');
    if (confirmation && student.id) {
      this.studentService.deleteStudent(student.id).subscribe(() => {
        this.loadStudents();
      });
    }
  }
}
