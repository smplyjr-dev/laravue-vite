import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@Pages/Home.vue");
const Features = () => import("@Pages/Features.vue");
const Blog = () => import("@Pages/Blog.vue");
const Contact = () => import("@Pages/Contact.vue");
const NotFound = () => import("@Pages/NotFound.vue");

// The middleware for every page of the application.
const globalMiddleware = ["check"];

// Load middleware modules dynamically.
const routeMiddleware = resolveMiddleware(require.context("/resources/js/middleware", false, /.*\.js$/));

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/features", name: "Features", component: Features },
    { path: "/blog", name: "Blog", component: Blog },
    { path: "/contact", name: "Contact", component: Contact },
    { path: "/:pathMatch(.*)", name: "NotFound", component: NotFound }
  ]
});

router.beforeEach(beforeEach);
router.afterEach(afterEach);

export default router;

/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function beforeEach(to, from, next) {
  let components = [];

  try {
    // Get the matched components and resolve them.
    components = await resolveComponents(to.matched.flatMap((record) => Object.values(record.components)));
  } catch (error) {}

  if (components.length === 0) {
    return next();
  }

  // Start the loading bar.
  if (components[components.length - 1].loading !== false) {
    // router.app.$nextTick(() => router.app.$loading.start());
  }

  // Get the middleware for all the matched components.
  const middleware = getMiddleware(components);

  // Call each middleware.
  callMiddleware(middleware, to, from, (...args) => {
    next(...args);
  });
}

/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
async function afterEach(to, from, next) {
  // await router.app.$nextTick();
  // router.app.$loading.finish();
}

/**
 * Resolve async components.
 *
 * @param  {Array} components
 * @return {Array}
 */
function resolveComponents(components) {
  return Promise.all(
    components.map((component) => {
      return typeof component === "function" ? component() : component;
    })
  );
}

/**
 * Call each middleware.
 *
 * @param {Array} middleware
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
function callMiddleware(middleware, to, from, next) {
  const stack = middleware.reverse();

  const _next = (...args) => {
    // Stop if "_next" was called with an argument or the stack is empty.
    if (args.length > 0 || stack.length === 0) {
      if (args.length > 0) {
        router.app.$loading.finish();
      }

      return next(...args);
    }

    const middleware = stack.pop();

    if (typeof middleware === "function") {
      middleware(to, from, _next);
    } else if (typeof middleware === "string") {
      if (middleware.includes(":")) {
        let mw = middleware.split(":");
        let name = mw[0];
        let attrs = mw[1].split(",");

        routeMiddleware[name](to, from, _next, attrs);
      } else {
        if (routeMiddleware[middleware]) {
          routeMiddleware[middleware](to, from, _next);
        } else {
          throw Error(`Undefined middleware ${middleware}`);
        }
      }
    }
  };

  _next();
}

/**
 * Merge the the global middleware with the components middleware.
 *
 * @param  {Array} components
 * @return {Array}
 */
function getMiddleware(components) {
  const middleware = [...globalMiddleware];

  components
    .filter((c) => c.middleware)
    .forEach((component) => {
      if (Array.isArray(component.middleware)) {
        middleware.push(...component.middleware);
      } else {
        middleware.push(component.middleware);
      }
    });

  return middleware;
}

/**
 * @param  {Object} requireContext
 * @return {Object}
 */
function resolveMiddleware(requireContext) {
  return requireContext
    .keys()
    .map((file) => [file.replace(/(^.\/)|(\.js$)/g, ""), requireContext(file)])
    .reduce((guards, [name, guard]) => ({ ...guards, [name]: guard.default }), {});
}
