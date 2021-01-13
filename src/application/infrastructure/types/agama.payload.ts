import { ArgsType, Field, InputType } from "@nestjs/graphql";

@InputType()
export class AgamaPayload {
  @Field(type => String, { nullable: false })
  name: string;
}

@ArgsType()
export class AgamaArg {
  @Field(type => String, { nullable: true })
  name?: string;
}
