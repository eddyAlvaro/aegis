// // update-last-login.interceptor.ts
// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { Observable, tap } from 'rxjs';
// import { Reflector } from '@nestjs/core';
// import { UserManagementService } from '@src/modules/credentials-management/application/user-management.service';

// @Injectable()
// export class UpdateLastLoginInterceptor implements NestInterceptor {
//   constructor(
//     private readonly userService: UserManagementService,
//     private readonly reflector: Reflector,
//   ) {}

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest();

//     // Obtener el usuario desde la request (debe estar autenticado)
//     const user = request.user;

//     // Evitar actualizar si no hay usuario o si la ruta está excluida
//     if (!user || this.isExcluded(context)) {
//       return next.handle();
//     }

//     // Actualizar la última conexión y continuar con la petición
//     return next.handle().pipe(
//       tap(() => {
//         this.userService.updateLastConnection(user.id).catch(console.error);
//       }),
//     );
//   }

//   private isExcluded(context: ExecutionContext): boolean {
//     return this.reflector.get<boolean>('skipLastLogin', context.getHandler());
//   }
// }
