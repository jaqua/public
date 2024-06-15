import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
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
      console.log({ body: gqlReq.body, args: ctx.getArgs() })
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
    // console.log({ err, user, info, context, status })

    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    )

    if (isPublic) return user
    if (info instanceof JsonWebTokenError) {
      // console.error(info)
      throw new UnauthorizedException('Invalid Token!')
    }
    if (err || !user) throw err || new UnauthorizedException()

    return super.handleRequest(err, user, info, context, status)
  }
}

@Injectable()
export class GqlAuthGuardLocal extends AuthGuard('local') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req

    if (!req) ctx.switchToHttp().getRequest()

    const {
      variables: {
        input: { username, password }
      }
    } = req.body

    req.body.username = username as string
    req.body.password = password as string
    return req
  }

  handleRequest(
    err: any,
    user: User | boolean,
    info: Error,
    context: ExecutionContext,
    status: any
  ) {
    // console.log({ err, user, info, context, status })

    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    )

    if (isPublic) return user
    if (err) throw err

    return super.handleRequest(err, user, info, context, status)
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context)
  }

  handleRequest(err, user, info, context, status) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log({ err, user, info, context, status })
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    const isPublic = this.reflector.get<string[]>(
      'isPublic',
      context.getHandler()
    )
    if (isPublic) return true

    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    const user = req.user

    console.log({ user })

    if (user && roles) return hasRole(roles, user.roles)
    throw new UnauthorizedException()
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    if (!req.user) {
      throw new NotFoundException('User was not found')
    }

    return req.user
  }
)
