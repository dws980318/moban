import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '',
      name: 'Layout',
      redirect: '/',
      component: () => import(/* webpackChunkName: "navigator" */ '@/components/layout/Layout'),
      children: [
        {
          path: '/',
          name: 'Index',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Index')
        },
        {
          path: '/info',
          name: 'Info',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Info')
        },
        {
          path: '/ticket',
          name: 'Ticket',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: '/ticket/type',
              redirect: '/ticket/type/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'ticket_type_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/type/List'),
                },
                {
                  path: 'add',
                  name: 'ticket_type_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/type/Details'),
                },
                {
                  path: ':id',
                  name: 'ticket_type_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/type/Details'),
                },

              ]
            },
            {
              path: '/ticket/code',
              redirect: '/ticket/code/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'ticket_code_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/code/List'),
                },
                {
                  path: 'add',
                  name: 'ticket_code_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/code/Details'),
                },
                {
                  path: ':id',
                  name: 'ticket_code_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/code/Details'),
                },
                {
                  path: 'Detail/:id',
                  name: 'ticket_type_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/code/Detail'),
                }
              ]
            },
            {
              path: '/ticket/examinee',
              redirect: '/ticket/examinee/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'ticket_examinee_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/examinee/List'),
                },
                {
                  path: 'add',
                  name: 'ticket_examinee_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/examinee/Details'),
                },
                {
                  path: ':id',
                  name: 'ticket_examinee_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/examinee/Details'),
                },
                {
                  path: 'Detail/:id',
                  name: 'ticket_type_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/ticket/examinee/Detail'),
                }
              ]
            }
          ],
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: '/order/examination',
              redirect: '/order/examination/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'order_examination_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/examination/List'),
                },
                {
                  path: 'add',
                  name: 'order_examination_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/examination/Details'),
                },
                {
                  path: ':id',
                  name: 'order_examination_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/examination/Details'),
                },
              ]
            },
            {
              path: '/order/informationCollect',
              redirect: '/order/informationCollect/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'order_informationCollect_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/informationCollect/List'),
                },
                {
                  path: 'add',
                  name: 'order_informationCollect_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/informationCollect/Details'),
                },
                {
                  path: ':id',
                  name: 'order_informationCollect_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/informationCollect/Details'),
                },
              ]
            },
            {
              path: '/order/professional',
              redirect: '/order/professional/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'order_professional_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/professional/List'),
                },
                {
                  path: 'add',
                  name: 'order_professional_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/professional/Details'),
                },
                {
                  path: ':id',
                  name: 'order_professional_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/professional/Details'),
                },
              ]
            },
            {
              path: '/order/subject',
              redirect: '/order/subject/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'order_subject_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/subject/List'),
                },
                {
                  path: 'add',
                  name: 'order_subject_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/subject/Details'),
                },
                {
                  path: ':id',
                  name: 'order_subject_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/subject/Details'),
                },
              ]
            },
            {
              path: '/order/academy',
              redirect: '/order/academy/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'order_academy_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/academy/List'),
                },
                {
                  path: 'add',
                  name: 'order_academy_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/academy/Details'),
                },
                {
                  path: ':id',
                  name: 'order_academy_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/order/academy/Details'),
                },
              ]
            }
          ]
        },
        {
          path: '/signIn',
          redirect: '/signIn/list',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: 'list',
              name: 'signIn_list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/signIn/List'),
            }
          ]
        },
        {
          path: '/check',
          redirect: '/check/list',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: 'list',
              name: 'check_list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/check/List'),
            }
          ]
        },
        {
          path: '/distribution',
          name: 'Distribution',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: '/distribution/distributor',
              redirect: '/distribution/distributor/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'distribution_distributor_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/distribution/distributor/List'),
                },
              ]
            },
            {
              path: '/distribution/preliminary',
              redirect: '/distribution/preliminary/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'distribution_preliminary_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/distribution/preliminary/List'),
                },
              ]
            },
            {
              path: '/distribution/record',
              redirect: '/distribution/record/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'distribution_record_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/distribution/record/List'),
                },
                {
                  path: ':id',
                  name: 'distribution_record_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/distribution/record/Details'),
                }
              ]
            },
            {
              path: '/distribution/reexamination',
              redirect: '/distribution/reexamination/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'distribution_reexamination_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/distribution/reexamination/List'),
                }
              ]
            }
          ],
        },
        {
          path: '/examineeData',
          name: 'examineeData',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: '/examineeData/distributor',
              redirect: '/examineeData/distributor/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'examineeData_distributor_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/examineeData/distributor/List'),
                },
                {
                  path: ':id',
                  name: 'examineeData_distributor_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/examineeData/distributor/Details'),
                }
              ]
            },
            {
              path: '/examineeData/record',
              redirect: '/examineeData/record/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'examineeData_record_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/examineeData/record/List'),
                },
                {
                  path: ':id',
                  name: 'examineeData_record_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/examineeData/record/Details'),
                }
              ]
            },
            {
              path: '/examineeData/qualified',
              redirect: '/examineeData/qualified/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'examineeData_qualified_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/examineeData/qualified/List'),
                },
                {
                  path: ':id',
                  name: 'examineeData_qualified_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/examineeData/qualified/Details'),
                }
              ]
            },
            {
              path: '/examineeData/apply',
              redirect: '/examineeData/apply/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'examineeData_apply_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/examineeData/apply/List'),
                },
                {
                  path: ':id',
                  name: 'examineeData_apply_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/examineeData/apply/Details'),
                }
              ]
            }
          ],
        },
        {
          path: '/sell',
          name: 'Sell',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: '/sell/inform',
              redirect: '/sell/inform/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
              children: [
                {
                  path: 'list',
                  name: 'sell_inform_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/inform/List'),
                },
                {
                  path: 'add',
                  name: 'sell_inform_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/inform/Details'),
                },
                {
                  path: ':id',
                  name: 'sell_inform_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/inform/Details'),
                },
              ]
            },
            {
              path: '/sell/one',
              redirect: '/sell/one/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/Panel'),
              children: [
                {
                  path: 'list',
                  name: 'sell_one_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/one/DoorMessage'),
                },
                {
                  path: 'add',
                  name: 'sell_one_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/one/AddDoorMessage'),
                },
                {
                  path: ':id',
                  name: 'sell_one_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/one/EditorDoorMessage'),
                },
              ]
            },
            {
              path: '/sell/two',
              redirect: '/sell/two/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/Panel'),
              children: [
                {
                  path: 'list',
                  name: 'sell_two_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/two/DoorMessage'),
                },
                {
                  path: 'add',
                  name: 'sell_two_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/two/AddDoorMessage'),
                },
                {
                  path: ':id',
                  name: 'sell_two_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/two/EditorDoorMessage'),
                },
              ]
            },
            {
              path: '/sell/three',
              redirect: '/sell/three/list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/Panel'),
              children: [
                {
                  path: 'list',
                  name: 'sell_one_list',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/three/DoorMessage'),
                },
                {
                  path: 'add',
                  name: 'sell_three_add',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/three/AddDoorMessage'),
                },
                {
                  path: ':id',
                  name: 'sell_three_details',
                  component: () => import(/* webpackChunkName: "navigator" */ '@/views/sell/three/EditorDoorMessage'),
                },
              ]
            },
          ]
        },
        {
          path: '/serve',
          redirect: '/serve/backup',
          component: () => import(/* webpackChunkName: "navigator" */ '@/views/Main'),
          children: [
            {
              path: 'backup',
              name: 'serve_list',
              component: () => import(/* webpackChunkName: "navigator" */ '@/views/serve/backup')
          },
            {
                path: 'list',
                name: 'serve_list',
                component: () => import(/* webpackChunkName: "navigator" */ '@/views/serve/List')
            },
          ]
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: "navigator" */ '@/views/Login')
    },
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: "navigator" */ '@/views/404')
    }
  ]
})
