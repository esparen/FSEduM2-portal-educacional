import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { DisciplineService } from './discipline.service';
import { CourseService } from './course.service';
import { IDisciplina } from '../models/disciplina.model';


export interface IActivity {
  title: string;
  description: string;
  dueDate: string;
}

export interface ISubject {
  name: string;
  semester: number;
}

export interface IExtraCourse {
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  constructor(
    private disciplineService: DisciplineService
  ) {}

  getUpcomingActivities(): Observable<IActivity[]> {
    return of([
      {
        title: 'Entrega de trabalho',
        description: 'Disciplina X',
        dueDate: '20/08/2024',
      },
      {
        title: 'Avaliação',
        description: 'Disciplina Y',
        dueDate: '22/08/2024',
      },
      {
        title: 'Chat com o mentor',
        description: 'Disciplina Z',
        dueDate: '25/08/2024',
      },
    ]);
  }

  getMySubjects(): Observable<ISubject[]> {
    //TODO: no futuro, buscar a matricula atual do usuário logado, e buscar as disciplinas
    return this.disciplineService.getDisciplinasByCursoBySemestre('af0b',1).pipe(
      map((disciplinas: IDisciplina[]) => {
        return disciplinas.map((disciplina) => {
          return {
            name: disciplina.name,
            semester: disciplina.semester,
          };
        });
      })
    );
  }

  getExtraCourses(): Observable<IExtraCourse[]> {
    return of([
      {
        name: 'Curso de Fotografia',
        description: 'Aprimore suas habilidades fotográficas',
      },
      { name: 'Curso de Música', description: 'Introdução à teoria musical' },
    ]);
  }
}
