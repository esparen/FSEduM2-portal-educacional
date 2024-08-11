import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface IDisciplina {
  semester: number;
  disciplines: string[];
}

export interface ICourse {
  name: string;
  semesters: IDisciplina[];
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  getDisciplinesByCourse(courseName: string): Observable<ICourse | undefined> {
    return this.http
      .get<ICourse[]>(this.apiUrl)
      .pipe(
        map((courses: ICourse[]) =>
          courses.find((course) => course.name === courseName)
        )
      );
  }

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.apiUrl);
  }

  getCourseNames(): Observable<string[]> {
    return this.http
      .get<ICourse[]>(this.apiUrl)
      .pipe(map((courses: ICourse[]) => courses.map((course) => course.name)));
  }
}
