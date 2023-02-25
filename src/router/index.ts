import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("@/views/HelloWorld.vue")
        },
        {
            path: "/minecraft/sound-effect",
            component: () => import("@/views/minecraft/SoundEffect.vue")
        }
    ]
})

export default router;