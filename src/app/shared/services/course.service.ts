import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IDisciplina } from '../models/disciplina.model';


export interface ICourse {
  id: string;
  name: string;
  semesters: IDisciplina[];
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesApiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getDisciplinesByCourse(courseName: string): Observable<ICourse | undefined> {
    return this.http
      .get<ICourse[]>(this.coursesApiUrl)
      .pipe(
        map((courses: ICourse[]) =>
          courses.find((course) => course.name === courseName)
        )
      );
  }

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.coursesApiUrl);
  }

  getCourseById(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.coursesApiUrl}/${id}`);
  }

  getCourseNames(): Observable<string[]> {
    return this.http
      .get<ICourse[]>(this.coursesApiUrl)
      .pipe(map((courses: ICourse[]) => courses.map((course) => course.name)));
  }
}
