import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IStudent {
  id?: number;
  fullName: string;
  cpf: string;
  email: string;
  phone: string;
  course: string;
}


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<IStudent> {
    return this.http.get<IStudent>(`${this.apiUrl}/${id}`);
  }

  addStudent(student: Omit<IStudent, 'id'>): Observable<IStudent> {
    return this.http.post<IStudent>(this.apiUrl, student);
  }

  setStudent(student: IStudent): Observable<IStudent> {
    return this.http.put<IStudent>(`${this.apiUrl}/${student.id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
