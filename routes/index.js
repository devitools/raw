/**
 * @param {VueRouter} router
 */
export default function (router) {
  router.addRoutes(
    [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ 'resources/views/Home.vue')
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import(/* webpackChunkName: "category" */ 'resources/views/Category.vue')
      },
      {
        path: '/customer',
        name: 'Customer',
        component: () => import(/* webpackChunkName: "customer" */ 'resources/views/Customer.vue')
      }
    ]
  )
}
