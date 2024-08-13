import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AppCardComponent, ICardData } from '../../shared/components/app-card/app-card.component'
import { IActivity, IExtraCourse, ISubject, EnrollmentService } from '../../shared/services/enrollment.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AppCardComponent,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  upcomingActivities$!: Observable<IActivity[]>;
  mySubjects$!: Observable<ISubject[]>;
  extraCourses$!: Observable<IExtraCourse[]>;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    this.upcomingActivities$ = this.enrollmentService.getUpcomingActivities();
    this.mySubjects$ = this.enrollmentService.getMySubjects();
    this.extraCourses$ = this.enrollmentService.getExtraCourses();
  }

  getActivityCardData(activity: IActivity): ICardData {
    return {
      title: activity.title,
      description: `${activity.description} até ${activity.dueDate}`,
    };
  }

  getSubjectCardData(subject: ISubject): ICardData {
    return {
      title: subject.name,
      description: `Semestre ${subject.semester}`,
    };
  }

  getExtraCourseCardData(course: IExtraCourse): ICardData {
    return {
      title: course.name,
      description: course.description,
    };
  }
}
