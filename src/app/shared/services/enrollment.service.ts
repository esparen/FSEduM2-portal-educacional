import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


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
  constructor() {}

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
    return of([
      { name: 'Disciplina A', semester: 1 },
      { name: 'Disciplina B', semester: 1 },
      { name: 'Disciplina C', semester: 1 },
    ]);
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
