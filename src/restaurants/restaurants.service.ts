import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RestaurantEntity } from './entities/restaurant.entity'
import { Repository } from 'typeorm'
import { CreateRestaurantInput } from './dtos/create-restaurant.dto'
import { UpdateRestaurantInput } from './dtos/update-restaurant.dto'
import { ERROR_NOT_FOUND } from '../constants/errors'

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

    async update({ id, data }: UpdateRestaurantInput): Promise<RestaurantEntity> {
        const restaurant = await this.restaurantRepository.findOne(id)

        if (!restaurant) {
            throw new Error(ERROR_NOT_FOUND)
        }

        for (const key in data) {
            if (
                data[key] !== undefined &&
                data.hasOwnProperty(key) &&
                restaurant.hasOwnProperty(key)
            ) {
                restaurant[key] = data[key]
            }
        }

        return this.restaurantRepository.save(restaurant)
    }
}
