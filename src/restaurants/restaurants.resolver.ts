import { Query, Resolver } from '@nestjs/graphql'
import { RestaurantEnity } from './entities/restaurant.enity'

@Resolver((of) => RestaurantEnity)
export class RestaurantsResolver {
    @Query(() => String)
    helloPizza(): string {
        return 'hello pizza'
    }

    @Query((returns) => [RestaurantEnity])
    restaurants(): RestaurantEnity[] {
        return []
    }
}
