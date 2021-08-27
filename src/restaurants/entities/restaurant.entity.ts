import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'

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
    @IsString()
    @Length(4, 16)
    name: string

    @Field((type) => Boolean, {
        nullable: true,
    })
    @IsBoolean()
    @IsOptional()
    isVegan: boolean

    @Field((type) => String)
    @IsString()
    @Length(4, 108)
    address: string

    @Field((type) => String)
    @IsString()
    @Length(4, 32)
    ownerName: string
}
