import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

// https://docs.nestjs.com/graphql/other-features#custom-decorators
export const AuthUser = createParamDecorator((data, context: ExecutionContext) => {
    // приводим контекст к нормальному виду и достаем user
    // user будет 100% т.к. без запроса оборвётcя еще на Guard
    // https://docs.nestjs.com/graphql/other-features#execution-context
    const gqlContext = GqlExecutionContext.create(context).getContext()

    return gqlContext['user']
})
