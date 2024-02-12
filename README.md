# Public repo

## Initial setup

```shell
npx create-nx-workspace@latest
nx add @nx/nest
nx add @nx/next
npx nx generate @nx/nest:application --name=backend --directory=apps/backend --projectNameAndRootFormat=as-provided --strict=true --no-interactive
npx nx generate @nx/next:application --name=frontend --directory=apps/frontend --projectNameAndRootFormat=as-provided --style=none --no-interactive
```
