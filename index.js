const router = {
  beforeHooks: [],
  options: {
    ignoreSame: true,
    routes: [],
    verbose: false
  },
  vue: null
}

class NSVueRouter {
  constructor(options = {}) {
    router.options = {
      ...router.options,
      ...options
    }
  }

  back(times) {
    back(times)
  }

  beforeEach(fn) {
    router.beforeHooks.push(fn)
  }

  push(...args) {
    push(...args)
  }

  pushClear(...args) {
    pushClear(...args)
  }
}

const back = (times = 1) => {
  for (let index = 0; index < times; index++) {
    router.vue.$navigateBack()
  }
}

const push = (name = null, options = {}) => {
  const route = router.options.routes.find(route => route.name === name)

  if (route) {
    if (
      router.options.ignoreSame &&
      reduce(router.vue, '$options.name') === reduce(route, 'component.name')
    ) {
      if (router.options.verbose) {
        /* eslint-disable-next-line no-console  */
        console.error(new Error('Same route!.'))
      }

      return
    }

    return resolveBeforeHooks(router.vue, route, options)
  }

  if (router.options.verbose) {
    /* eslint-disable-next-line no-console  */
    console.error(new Error(`Route ${name} not found!.`))
  }
}

const pushClear = (name, options = {}) => {
  push(name, { ...options, clearHistory: true })
}

const resolveBeforeHooks = (vue, route, options, current = 0) => {
  if (router.beforeHooks.length === current) {
    vue.$navigateTo(route.component, options)

    return
  }

  return router.beforeHooks[current](route, () =>
    resolveBeforeHooks(vue, route, options, current + 1)
  )
}

const reduce = (source, string = '') =>
  string
    .split('.')
    .reduce(
      (previous, current) =>
        typeof previous === 'object' ? previous[current] : previous,
      source
    )

const install = Vue => {
  Vue.mixin({
    beforeCreate() {
      if (this.$navigateTo && reduce(this, '$options.name')) {
        this.$router = {
          back,

          push,

          pushClear
        }

        router.vue = this
      }
    }
  })
}

NSVueRouter.install = install

export default NSVueRouter
