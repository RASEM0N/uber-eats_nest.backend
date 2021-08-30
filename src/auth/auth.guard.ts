import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { GqlExecutionContext } from '@nestjs/graphql'

// https://docs.nestjs.com/guards
@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // приводим контекст к нормальному виду
        // https://docs.nestjs.com/graphql/other-features#execution-context
        const gqlContext = GqlExecutionContext.create(context).getContext()
        const user = gqlContext['user']

        if (!user) {
            return false
        }

        return true
    }
}
