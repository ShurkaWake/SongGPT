import mainPage from "@/pages/main-page.vue";
import loginNeeded from "@/pages/login-needed.vue"
import {createRouter, createWebHistory} from "vue-router";
import loginPage from "@/pages/login-page.vue";
import registerPage from "@/pages/register-page.vue"

const routes = [
    {
        path: "/unauthorized",
        component: loginNeeded
    },
    {
        path: "/",
        component: mainPage
    },
    {
        path: "/login",
        component: loginPage
    },
    {
    path: "/register",
    component: registerPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router