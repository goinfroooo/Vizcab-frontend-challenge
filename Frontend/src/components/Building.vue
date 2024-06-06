<template>

    <div class="container mt-5" >
        <div v-if="!building_displayed" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div v-else class="card d-flex align-items-center">
            <div class="card-body">
                <h5 class="card-title">{{building_displayed.name}}</h5>
                <p class="card-text">Surface : {{ building_displayed.surface }}</p>
                <p class="card-text">Carbone emission : {{ building_displayed.carbon_emission }}</p>
                <p class="card-text">Adresse :</p>
                <p class="card-text">{{ building_displayed.adress }}</p>
                <p class="card-text">{{ building_displayed.postcode }}</p>
                <p class="card-text">{{ building_displayed.city }}</p>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">

import { onMounted,ref } from 'vue';
import { BuildingInterface } from '../scripts/interfaces';
//import { BuildingStore } from "../store/BuildingStore.ts";
import { useRoute } from 'vue-router';

const building_displayed = ref<BuildingInterface | null>(null)
//const BuildingSaved = BuildingStore();

onMounted(() => {

    const route = useRoute();
    const BuildingId:number = route.params.id as unknown as number; 
    console.log(BuildingId);
    const BuildingLocal = localStorage.getItem("buildings");
    if (BuildingLocal) {
        const BuildingSaved:BuildingInterface[] = JSON.parse(BuildingLocal);
        console.log(BuildingSaved);
        for (let building in BuildingSaved) {
            console.log(building);
            if (building.id === BuildingId){
                building_displayed.value = building;
                return 0;
            }
        }
    }
    else {
        throw new Error("No buildings in localstorage");
    }

    
    throw new Error("Building inexistant dans le store");
})

</script>

<style scoped lang="scss">

</style>
