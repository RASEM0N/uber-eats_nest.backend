import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@InputType({
    // Избавляет нас от проблемы
    // Схема должна содержать типы с уникальными именами, но содержит
    // несколько типов с именем "RestaurantEntity".

    // RestaurantEntity, как тип не считывается еще раз
    isAbstract: true,
})
@ObjectType()
@Entity()
export class RestaurantEntity {
    @Field((type) => Number)
    @PrimaryGeneratedColumn()
    id: number

    @Field((type) => String)
    @IsString()
    @Length(4, 16)
    @Column()
    name: string

    @Field((type) => Boolean, {
        nullable: true,
    })
    @IsBoolean()
    @IsOptional()
    @Column({
        default: false,
        type: 'boolean',
    })
    isVegan: boolean

    @Field((type) => String)
    @IsString()
    @Length(4, 108)
    @Column()
    address: string

    @Field((type) => String)
    @IsString()
    @Length(4, 32)
    @Column()
    ownerName: string

    @Field((type) => String)
    @Column()
    categoryName: string
}
