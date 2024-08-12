import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importar todos os componentes
import { AppCardComponent } from './components/app-card/app-card.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Importar todos os serviços
import { AuthService } from './services/auth.service'; 
import { CourseService } from './services/course.service';
import { DisciplineService } from './services/discipline.service';
import { EnrollmentService } from './services/enrollment.service';
import { StudentService } from './services/student.service';

// Exportar os componentes e serviços
@NgModule({
  declarations: [
    AppCardComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [CommonModule],
  providers: [
    AuthService,
    CourseService,
    DisciplineService,
    EnrollmentService,
    StudentService,
  ],
  exports: [AppCardComponent, HeaderComponent, SidebarComponent, CommonModule],
})
export class SharedModule {}
