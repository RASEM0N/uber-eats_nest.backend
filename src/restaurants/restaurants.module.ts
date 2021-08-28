import { Module } from '@nestjs/common'
import { RestaurantsResolver } from './restaurants.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RestaurantEntity } from './entities/restaurant.entity'
import { RestaurantsService } from './restaurants.service';

@Module({
    imports: [TypeOrmModule.forFeature([RestaurantEntity])],
    providers: [RestaurantsResolver, RestaurantsService],
})
export class RestaurantsModule {}
