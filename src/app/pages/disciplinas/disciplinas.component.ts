import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService, ICourse } from '../../shared/services/course.service';
import { DisciplineService } from '../../shared/services/discipline.service';
import { IDisciplina } from '../../shared/models/disciplina.model';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

interface CursoSemestre {
  semestre: number;
  disciplinas: IDisciplina[];
}

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './disciplinas.component.html',
  styleUrl: './disciplinas.component.scss',
})
export class DisciplinasComponent implements OnInit {
  cursos: ICourse[] = [];

  disciplinas: IDisciplina[] = [];
  groupedData: { curso: ICourse; semestres: CursoSemestre[] }[] = [];
  cursoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private disciplinaService: DisciplineService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.cursoId = params.get('cursoId') || null;
      this.loadData();
    });
  }

  loadData() {
    this.courseService.getCourses().subscribe((cursos) => {
      this.cursos = cursos;
      this.loadDisciplinas();
    });
  }

  loadDisciplinas() {
    if (this.cursoId) {
      console.log('this.cursoId', this.cursoId);

      this.disciplinaService
        .getDisciplinasByCurso(this.cursoId)
        .subscribe((disciplinas) => {
          this.disciplinas = disciplinas;
          this.groupData();
        });
    } else {
      this.disciplinaService.getDisciplinas().subscribe((disciplinas) => {
        this.disciplinas = disciplinas;
        this.groupData();
      });
    }
  }

  groupData() {
    this.groupedData = this.cursos.map((curso) => {
      const semestres: CursoSemestre[] = curso.semesters.map((semestre) => {
        const disciplinasDoSemestre = this.disciplinas.filter((disciplina) => {
          return (
            disciplina.courseId === curso.id &&
            disciplina.semester === semestre.semester
          );
        });
        const response2 = {
          semestre: semestre.semester,
          disciplinas: disciplinasDoSemestre,
        };
        return response2;
      });
      const response = { curso, semestres };
      console.log('response', response);
      return response;
    });
  }
}  