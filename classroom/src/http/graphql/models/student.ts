import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrollment } from './enrollment';

@ObjectType('User')
@Directive('@extends')
@Directive('@key(fields: "authUserId")')
export class Student {
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
