import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RestaurantEntity } from './entities/restaurant.entity'
import { CreateRestaurantInput, CreateRestaurantOutput } from './dtos/create-restaurant.dto'
import { Inject } from '@nestjs/common'
import { RestaurantsService } from './restaurants.service'

@Resolver((of) => RestaurantEntity)
export class RestaurantsResolver {
    constructor(
        @Inject(RestaurantsService) private readonly restaurantService: RestaurantsService,
    ) {}

    @Query(() => String)
    helloPizza(): string {
        return 'hello pizza'
    }

    @Query((returns) => [RestaurantEntity])
    restaurants(): Promise<RestaurantEntity[]> {
        return this.restaurantService.getAll()
    }

    @Mutation((returns) => CreateRestaurantOutput)
    async restaurantCreate(
        @Args('input') createRestaurantInput: CreateRestaurantInput,
    ): Promise<CreateRestaurantOutput> {
        try {
            const createdRestaurant = await this.restaurantService.create(createRestaurantInput)

            return {
                ok: true,
                restaurant: createdRestaurant,
            }
        } catch (e) {
            const errors = []

            errors.push(e.message)

            return {
                ok: false,
                errors,
            }
        }
    }
}
