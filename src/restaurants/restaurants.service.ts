import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RestaurantEntity } from './entities/restaurant.entity'
import { Repository } from 'typeorm'
import { CreateRestaurantInput } from './dtos/create-restaurant.dto'

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(RestaurantEntity)
        private readonly restaurantRepository: Repository<RestaurantEntity>,
    ) {}

    getAll(): Promise<RestaurantEntity[]> {
        return this.restaurantRepository.find()
    }

    async create(createRestaurantDto: CreateRestaurantInput): Promise<RestaurantEntity> {
        const newRestaurant = await this.restaurantRepository.create(createRestaurantDto)
        return this.restaurantRepository.save(newRestaurant)
    }
}
