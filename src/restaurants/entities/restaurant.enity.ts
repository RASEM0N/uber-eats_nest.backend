import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RestaurantEnity {
    @Field((type) => String)
    name: string
}
