import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDisciplina } from '../models/disciplina.model';

@Injectable({
  providedIn: 'root',
})
export class DisciplineService {
  private apiUrl = 'http://localhost:3000/disciplines'; // URL do JSON Server

  constructor(private http: HttpClient) {}

  getDisciplinasByCurso(cursoId: string): Observable<IDisciplina[]> {
    return this.http
      .get<IDisciplina[]>(this.apiUrl)
      .pipe(
        map((disciplinas) => disciplinas.filter((disciplina) =>             
            disciplina.courseId == cursoId) 
        )
      );
  }

  getDisciplinas(): Observable<IDisciplina[]> {
    return this.http.get<IDisciplina[]>(this.apiUrl);
  }

  getDisciplinasByCursoBySemestre(
    cursoId: string,
    semestre: number
  ): Observable<IDisciplina[]> {
    return this.http
      .get<IDisciplina[]>(this.apiUrl)
      .pipe(
        map((disciplinas) =>
          disciplinas.filter(
            (disciplina) =>
              disciplina.courseId === cursoId &&
              disciplina.semester === semestre
          )
        )
      );
  }
}
