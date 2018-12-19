## A simple router implementation that is suitable for NativeScript-Vue.

## Prerequisites / Requirements

|                                               |
| --------------------------------------------- |
| All your own components must have unique name |
| All routes name must have unique name         |
| Your app need a main Frame in the render      |

## Install

```
npm install nativescript-vue-router-ns --save
or
yarn add nativescript-vue-router-ns
```

## Usage

```js
// app/router/index.js

import Vue from 'nativescript-vue'

import NSVueRouter from 'nativescript-vue-router'

import Dashboard from './components/Dashboard'
import Login from './components/Login'

Vue.use(NSVueRouter)

const routes = [
  {
    name: 'dashboard.index',
    component: Dashboard,
    meta: { auth: true }
  },
  {
    name: 'login.index',
    component: Login,
    meta: { guest: true }
  }
]

const router = new NSVueRouter({
  ignoreSame, // <-- Optional. Will set if reject or accept navigate to same current component.
  routes,
  /* eslint-disable-next-line no-undef  */
  verbose: TNS_ENV !== 'production' // <-- Optional. Will output the warnings to console.
})

export default router
```

```js
// app/app.js or app/main.js

import Vue from 'nativescript-vue'

import Main from './Main'

import router from './router'

new Vue({
  router

  // ...

  render: h => h('frame', [h(Main)]) // <-- Main Frame in render app
}).$start()
```

```html
<!-- Your own Vue Components -->
<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" justifyContent="center">
      <button text="Navigate direct" @tap="$router.push('dashboard.index')" />

      <button text="Navigate with method" @tap="submit" />
    </FlexboxLayout>
  </Page>
</template>

<script>
  export default {
    name: 'LoginIndex',

    methods: {
      submit() {
        // ...

        this.$router.pushClear('dashboard.index')

        // ...
      }
    }
  }
</script>
```

### Guards and other before actions

```js
// app/router/index.js

// ...

router.beforeEach((to, next) => {
  if (to.meta.auth && isLogged) {
    /* eslint-disable-next-line no-undef */
    if (TNS_ENV !== 'production') {
      /* eslint-disable-next-line no-console */
      console.error(new Error('To Login!.'))
    }

    router.pushClear('login.index')
  } else if (to.meta.guest && isLogged) {
    router.push('dashboard.index')
  } else {
    next()
  }
})

// ...
```

## API

### Installing

| Parameters   | Type      | Default | Description                                                 |
| ------------ | --------- | ------- | ----------------------------------------------------------- |
| `ignoreSame` | `Boolean` | `true`  | Set if reject or accept navigate to same current component. |
| `routes`     | `Array`   | `[]`    | Array of objects with app's routes.                         |
| `verbose`    | `Boolean` | `false` | Show output the warnings to console.                        |

### Navigating

This package provides 3 methods for navigation, `$router.push`, `$router.pushClear` and `$router.back`

| Parameters | Type               | Description                                                                                                                                             |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | `String`           | First parameter in `push` and `pushClear` methods.                                                                                                      |
| `options`  | `Object`           | Is an optional object, which accepts all options supported by [Manual Routing](https://nativescript-vue.org/en/docs/routing/manual-routing/#navigateto) |
| `times`    | `[String, Number]` | Optional parameter in `back` method that go back any times that you set.                                                                                |

NOTE: When `$router.pushClear` method is used the navigator stack is cleaned.

## TODO

- [x] Native navigation
- [x] Before actions
- [ ] After actions
- [ ] Nested routes

## Contributing

Thank you for considering contributing to the NSVueRouter! Please leave your PR or [issue](https://github.com/emiliogrv/nativescript-vue-router/issues).

# License

[MIT](https://opensource.org/licenses/MIT)
