<script setup>
import {computed} from "vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import {useLanguages} from "@/composables/useLanguages";
import {literals} from "@/constants";

const storeLanguages = useLanguages();
const menuItems = computed(() => [
    {
        name: literals.nav_home[storeLanguages.getActiveLanguage.value],
        link: "/"
    },
    {
        name: literals.nav_favorite[storeLanguages.getActiveLanguage.value],
        link: "/favorite"
    }
]);

</script>

<template>
    <div class="header">
        <div class="wr">
            <div class="header-content">
                <nav>
                    <ul>
                        <li
                            v-for="item in menuItems"
                            :key="item.link"
                        >
                            <router-link :to="item.link">
                                {{ item.name }}
                            </router-link>
                        </li>
                    </ul>
                </nav>
                <div class="header-block">
                    <router-link to="/" class="header-logo">
                        <img src="@/assets/img/logo.svg" alt="#">
                    </router-link>
                    <Dropdown
                        :selected="storeLanguages.getActiveLanguage"
                        @update:selected="storeLanguages.setActiveLanguage($event)"
                        :data="storeLanguages.getData"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.header {
    padding: 10px 0;
    background: #9999d4;
    margin-bottom: 20px;

    &-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    nav {
        ul {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            grid-gap: 12px;
            gap: 12px;

            li {
                list-style: none;

                a {
                    text-decoration: none;
                    color: $black;
                    font-weight: 500;
                    border-bottom: 1px solid transparent;
                    transition: all 0.3s;

                    &:hover {
                        border-bottom-color: $black;
                    }
                }
            }
        }
    }

    &-block {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        grid-gap: 12px;
        gap: 12px;
    }

    &-logo {
        max-width: 40px;
        display: block;

        img {
            width: 100%;
            display: block;
        }
    }

    .router-link-active {
        color: #353589;
        border-bottom-color: #353589;
    }
}
</style>
