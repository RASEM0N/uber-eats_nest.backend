import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RestaurantEntity } from './entities/restaurant.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(RestaurantEntity)
        private readonly restaurantRepository: Repository<RestaurantEntity>,
    ) {}
}
