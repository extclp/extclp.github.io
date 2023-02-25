import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
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