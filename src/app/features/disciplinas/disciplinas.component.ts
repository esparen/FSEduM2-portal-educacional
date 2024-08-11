import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoursesService, ICourse, IDisciplina } from '../../shared/services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disciplinas.component.html',
  styleUrl: './disciplinas.component.scss',
})
export class DisciplinasComponent implements OnInit {
  courseName!: string;
  course$!: Observable<ICourse | undefined>;

  constructor(
    private route: ActivatedRoute,
    private courseDataService: CoursesService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (!params['course']) {
        this.courseDataService.getCourseNames().subscribe(courseNames => {
          this.courseName = courseNames[0];
          console.log('this.courseName', this.courseName);
          this.course$ = this.courseDataService.getDisciplinesByCourse(this.courseName);
        });
      }
      else {
        this.courseName = params['course'];  
        this.course$ = this.courseDataService.getDisciplinesByCourse(this.courseName);
      }      
    });
  }
}
