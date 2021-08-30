import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class QueryOutput {
    @Field((type) => [String], {
        nullable: true,
    })
    errors?: string[]

    @Field((type) => Boolean)
    ok: boolean
}
