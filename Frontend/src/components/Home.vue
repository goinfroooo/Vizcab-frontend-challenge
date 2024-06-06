<template>
    <div class="text text-primary">Hello Word</div>

    <div id="container">
        <div class="row">
            <div class="col-6 btn"><button class="btn btn-primary" @click="sort_by_surface">Trier par surface</button></div>
            <div class="col-6 "><button class="btn btn-primary" @click="sort_by_carbon_emission">Trier par emission</button></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-4 col-lg-3" v-for="building in buildings">
                <div class="card p-3 d-flex align-items-center">
                    <div class="card-body p-1 mb-3">
                        <h5 class="card-title">{{building.name}}</h5>
                        <p class="card-text fs-6 overflow-hidden">Surface : {{ building.surface }}</p>
                        <p class="card-text fs-6 overflow-hidden">Emission : {{ building.carbon_emission }}</p>
                    </div>
                    <div class="card-body pb-0 d-flex justify-content-center">
                        <router-link :to="'/Building/' + building.id" class="btn btn-primary me-2">Voir plus</router-link>
                        
                    </div>
                    </div>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">

import { onMounted,ref } from 'vue';
import { BuildingInterface } from '../scripts/interfaces';
//import { BuildingStore } from "../store/BuildingStore.ts";

const buildings = ref<BuildingInterface[]> ([]);
//const BuildingSaved = BuildingStore();

const get_buildings = async () => {
  try {
    //const articleId = this.$route.params.id;
    
    const route = "/localhost:3000";
    let options: RequestInit = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        
    }

    
        const response = await fetch(route, options);
        if (!response.ok) {
            throw new Error('La requête a échoué.');
        }
        const data = await response.json();
        console.log(data);
        return data.content;
    } catch (error) {
        console.error("Erreur lors de la récupération des buildings", error);
    }

}

const sort_by_surface = () => {
    buildings.value=buildings.value.slice().sort((a,b)=>a.surface-b.surface);
}
const sort_by_carbon_emission = () => {
    buildings.value=buildings.value.slice().sort((a,b)=>a.carbon_emission-b.carbon_emission);
}


const generate_building = async() => {
    let buildings:BuildingInterface[] = [];
    for (let i = 0; i<10 ; i++) {
        let building:BuildingInterface = {
            "id": i, // Building ID
            "name": "Flatley Inc", // Building name
            "surface": 3354-i*10, // Building area in square meters
            "carbon_emission": 409788-i*100, // Carbon emission of the building in kg eq. CO2
            "adress": "1 New Castle Center", // Building address
            "postcode": 15489, // Building postal code
            "city": "Majin" // Building city
        }
        buildings.push (building);
    }
    return buildings;
}

onMounted ( async() => {

    //buildings.value = await get_buildings();
    buildings.value = await generate_building();
    localStorage.setItem("buildings",JSON.stringify(buildings.value));
    //BuildingSaved = buildings.value;

});

</script>

<style scoped lang="scss">

</style>
