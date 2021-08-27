import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class RestaurantsResolver {
    @Query(() => String)
    helloPizza(): string {
        return 'hello pizza'
    }
}
