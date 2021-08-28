import { Field, ID, InputType, ObjectType } from '@nestjs/graphql'
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@InputType({
    isAbstract: true,
})
@ObjectType()
@Entity()
export class RestaurantEntity {
    @Field((type) => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field((type) => String)
    @IsString()
    @Length(4, 16)
    @Column()
    name: string

    @Field((type) => Boolean)
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
    @IsString()
    @Length(4, 32)
    @Column()
    categoryName: string
}
