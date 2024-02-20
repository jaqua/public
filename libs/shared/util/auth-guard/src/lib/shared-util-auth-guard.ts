import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  createParamDecorator
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { JsonWebTokenError } from 'jsonwebtoken'

import { User } from 'libs/project.de/util/graphql/src'
import { hasRole } from '@jaqua/shared/util/auth'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super()
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const gqlReq = ctx.getContext().req
    if (gqlReq) {
      const { variables } = ctx.getArgs()
      gqlReq.body = variables
      return gqlReq
    }
    return context.switchToHttp().getRequest()
  }
  handleRequest(
    err: any,
    user: User | boolean,
    info: Error,
    context: ExecutionContext,
    status: any
  ) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    )

    if (isPublic) return user
    else if (info instanceof JsonWebTokenError) {
      console.error(info)
      throw new UnauthorizedException('Invalid Token!')
    } else if (err || !user) throw err || new UnauthorizedException()

    return super.handleRequest(err, user, info, context, status)
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    const isPublic = this.reflector.get<string[]>(
      'isPublic',
      context.getHandler()
    )

    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    const user = req.user

    if (isPublic) return true
    if (user && roles) return hasRole(roles, user.roles)
    throw new UnauthorizedException()
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    const user = req.user

    return { userId: user?._id?.toString(), username: user?.username }
  }
)
