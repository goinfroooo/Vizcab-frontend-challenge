<template>
    <div id="container">
      <div class="row">
        <div class="col-6 btn">
          <button class="btn btn-primary" @click="sort_by_surface">Trier par surface</button>
        </div>
        <div class="col-6">
          <button class="btn btn-primary" @click="sort_by_carbon_emission">Trier par émission</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3" v-for="building in buildings" :key="building.id">
          <div class="card p-3 d-flex align-items-center">
            <div class="card-body p-1 mb-3">
              <h5 class="card-title">{{ building.name }}</h5>
              <p class="card-text fs-6 overflow-hidden">Surface : {{ building.surface }}</p>
              <p class="card-text fs-6 overflow-hidden">Émission : {{ building.carbon_emission }}</p>
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
  import { ref, onMounted } from 'vue';
  import { BuildingInterface } from '../scripts/interfaces';
  
  // Définition de la référence buildings
  const buildings = ref<BuildingInterface[]>([]);
  
  // Fonction pour obtenir les bâtiments depuis l'API
  const get_buildings = async () => {
    try {
      const route = "http://localhost:3000";
      const options: RequestInit = {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const response = await fetch(route, options);
      if (!response.ok) {
        throw new Error('La requête a échoué.');
      }
      const data = await response.json();
      console.log(data.data);
      return data.data;
      
    } catch (error) {
      console.error("Erreur lors de la récupération des buildings", error);
    }
  };
  
  // Fonctions pour trier les bâtiments
  const sort_by_surface = () => {
    buildings.value = buildings.value.slice().sort((a, b) => a.surface - b.surface);
  };
  const sort_by_carbon_emission = () => {
    buildings.value = buildings.value.slice().sort((a, b) => a.carbon_emission - b.carbon_emission);
  };
  
  // Fonction pour générer des bâtiments (si nécessaire)
  const generate_building = async () => {
    let buildingsList: BuildingInterface[] = [];
    for (let i = 0; i < 10; i++) {
      let building: BuildingInterface = {
        id: i, // ID du bâtiment
        name: "Flatley Inc", // Nom du bâtiment
        surface: 3354 - i * 10, // Surface du bâtiment en mètres carrés
        carbon_emission: 409788 - i * 100, // Émission de carbone du bâtiment en kg eq. CO2
        adress: "1 New Castle Center", // Adresse du bâtiment
        postcode: 15489, // Code postal du bâtiment
        city: "Majin", // Ville du bâtiment
      };
      buildingsList.push(building);
    }
    return buildingsList;
  };
  
  // Utilisation du hook onMounted pour récupérer les bâtiments au montage du composant
  onMounted(async () => {
    buildings.value = await get_buildings() || [];
    localStorage.setItem("buildings", JSON.stringify(buildings.value));
  });
  </script>
  

<style scoped lang="scss">

</style>
