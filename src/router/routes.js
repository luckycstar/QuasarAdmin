const routes = [{ path: "/", component: () => import("layouts/MyLayout.vue"),
  children: [
    {path: "", component: () => import("pages/sampleMulti.vue"),
    //  redirect: { name: 'child1' },
    children: [
      {
        path: "/child1",
        name: "Child1",
        component: () => import("components/Index/Child1.vue")
      },{
        path: "/child2",
        name: "Child2",
        component: () => import("components/Index/Child2.vue")
      },{
        path: "/child3",
        name: "Child3",
        component: () => import("components/Index/Child3.vue")
      },{
        path: "/child4",
        name: "Child4",
        component: () => import("components/Index/Child4.vue")
      },
    ]
    },
    {
      path: "/sampleMulti2", component: () => import("pages/sampleMulti2.vue"),
    //  redirect: { name: 'child1' },
    children: [
      {
        path: "child5",
        name: "Child5",
        component: () => import("components/Index/Child1.vue")
      },{
        path: "child6",
        name: "Child6",
        component: () => import("components/Index/Child2.vue")
      },
    ]
    },





    {
      path: "/page1",
      name: "page1",
      component: () => import("pages/page1")
    },

    {
      path: "/Publications",
      name: "publications",
      component: () => import("pages/Publications")
    },
    {
      name: 'login',
      path: 'login',
      component: () => import('components/Pages/Login.vue')
    },

    {
      path: "/page2",
      name: "publications",
      component: () => import("pages/page2")
    },
    {
      path: "/trainees",
      name: "trainees",
      component: () => import("pages/trainees.vue")
    },
    {
      path: "/instructions",
      name: "instructions",
      component: () => import("pages/instructions.vue")
    },


    {
      path: "/membership",
      name: "membership",
      component: () => import("pages/membership.vue")
    },

    {
      path: "/page3",
      name: "grants",
      component: () => import("pages/page3")
    },
    {
      path: "/report",
      name: "reports",
      component: () => import("pages/report")
    },
    {
      path: "/grant",
      name: "grant",
      component: () => import("pages/grant")
    },


  ],

},
{
      path: "/bibliography",
      name: "bibliography",
      component: () => import("pages/bibliography.vue")
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
