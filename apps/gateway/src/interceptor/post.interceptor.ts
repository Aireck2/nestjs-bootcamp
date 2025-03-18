import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

@Injectable()
export class PostInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(PostInterceptor.name);
    const dateStart = new Date();

    return next.handle().pipe(
      tap((data) => {
        const dateEnd = new Date();
        console.log(
          `Request: ${context.getClass().name}.${context.getHandler().name}`,
          "Execution time:",
          dateEnd.getTime() - dateStart.getTime(),
          "ms",
        );
      }),
      map((data) => data),
    );
  }
}
