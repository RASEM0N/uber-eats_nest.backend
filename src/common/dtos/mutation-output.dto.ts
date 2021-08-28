import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MutationOutput {
    @Field((type) => [String], {
        nullable: true,
    })
    errors?: string[]

    @Field((type) => Boolean)
    ok: boolean
}
