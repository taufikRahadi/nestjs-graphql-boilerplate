import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class AuthGuard implements CanActivate {

  // inject service to check user data or session
  constructor(
    // private readonly userService:
    roles: string[] 
  ) {
    this.roles = roles
  }

  private roles: string[]

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext()
    // if (!ctx.headers.authorization) {
    //   return false
    // }

    return true
  }

  checkRoles(userRole: string) {
    const checked = this.roles.filter(role => userRole === role)
    console.log(checked);
    
    return checked.length > 0 ? true : false
  }

  // any validate session function

}
