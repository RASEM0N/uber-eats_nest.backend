import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType({
    // Избавляет нас от проблемы
    // Схема должна содержать типы с уникальными именами, но содержит
    // несколько типов с именем "RestaurantEntity".

    // RestaurantEntity, как тип не считывается еще раз
    isAbstract: true,
})
@ObjectType()
export class RestaurantEntity {
    @Field((type) => String)
    name: string

    @Field((type) => Boolean)
    isVegan: boolean

    @Field((type) => String)
    address: string

    @Field((type) => String)
    ownerName: string
}
