import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Patch,
} from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { UploadMiddleware } from '../middlewares/upload-file.middleware';
import { JwtAuthMiddleware } from '../middlewares/jwt.middleware';
import { UploadMultiFilesMiddleware } from '../middlewares/upload-multi-file.middleware';
import { TestController } from '../controllers/test.controller';
import { JwtService } from '@nestjs/jwt';
import { MasterUserModule } from './mas-user.module';
import { AuthModule } from './auth.module';
import { DocumentsModule } from './trn-documents.module';
import { FilesModule } from './files.module';
import { DropdownModule } from './dropdown.module';
import { EducationModule } from './trn-education.module';
import { InsigniaModule } from './trn-insignia.module';
import { AcademicModule } from './trn-academic.module';
import { SystemModule } from './system.module';
import { LeaveModule } from './trn-leave.module';
import { LeaveApproveModule } from './trn-leave-approve.module';
import { AttendanceModule } from './trn-attendance.module';
import { ScheduleModule } from '@nestjs/schedule';
import { LeaveCronModule } from './leave-cron.module';
@Module({
  imports: [
    DatabaseModule,
    FilesModule,
    AuthModule,
    DropdownModule,
    MasterUserModule,
    DocumentsModule,
    EducationModule,
    InsigniaModule,
    AcademicModule,
    SystemModule,
    LeaveModule,
    LeaveApproveModule,
    AttendanceModule,
    ScheduleModule.forRoot(),
    LeaveCronModule,
  ],
  controllers: [TestController],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UploadMiddleware) // ใช้ Middleware
      .forRoutes
      // { method: RequestMethod.POST, path: 'strategic-plan' },
      // { method: RequestMethod.PATCH, path: 'strategic-plan/:id' },
      // { method: RequestMethod.POST, path: 'formtarget/upload-file-smartform/:targetId' },

      // { method: RequestMethod.POST, path: 'activity/import-holiday' },
      // { method: RequestMethod.POST, path: 'project' },
      // { method: RequestMethod.PATCH, path: 'project/:id' },

      // { method: RequestMethod.PATCH, path: 'master-car/:Id' },
      ()
      .apply(UploadMultiFilesMiddleware)
      .forRoutes(
        { method: RequestMethod.POST, path: 'document' },
        // { method: RequestMethod.PATCH, path: 'activity/:id' },
        // { method: RequestMethod.POST, path: 'formtarget/upload-file-fiscalyear' },
        // { method: RequestMethod.POST, path: 'reporting' },
        // { method: RequestMethod.PATCH, path: 'reporting/:id' },

        // { method: RequestMethod.PATCH, path: 'trn-repair/:Id' },
        // { method: RequestMethod.POST, path: 'file-management/upload-file/:folderId?' },
      )
      .apply(JwtAuthMiddleware)
      .exclude(
        { path: '/test', method: RequestMethod.GET },
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/login-byusername', method: RequestMethod.POST },
        // { path: '/master-user', method: RequestMethod.POST },
        // { path: '/master-user/:id', method: RequestMethod.PUT },
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
