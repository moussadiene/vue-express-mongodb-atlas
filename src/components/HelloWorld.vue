<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mt-5" cols="12">
        <v-row>
          <v-col cols="5">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card
                :elevation="hover ? 10 : 3"
                :class="{ 'on-hover': hover }"
                class="mx-auto"
              >
                <v-card-text class="font-weight-medium text-center subtitle-1">
                  <h2 class="headline font-weight-bold ma-5">
                    Vue - Vuetify - vee-validate
                  </h2>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="7">
            <v-hover v-slot="{ hover }" open-delay="200">
              <v-card
                :elevation="hover ? 10 : 3"
                :class="{ 'on-hover': hover }"
                class="ma-auto"
              >
                <v-card-text class="font-weight-medium text-center subtitle-1">
                  <h2 class="headline font-weight-bold ma-5">
                    Nodejs - Express - Mongodb - Data cloud Atlas
                  </h2>
                </v-card-text>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="ma-2" color="primary" dark v-bind="attrs" v-on="on">
            Ajouter un client
            <v-icon dark right> mdi-plus-box </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-toolbar>
            <v-toolbar-title>
              <h2 color="primary">Nouveau client</h2></v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn icon small @click="clear">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <form @submit.prevent="AjoutClient">
                <v-row>
                  <v-col>
                    <validation-observer ref="observer" v-slot="{ invalid }">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Prenom"
                        rules="required|max:100"
                      >
                        <v-text-field
                          v-model="client.prenom"
                          :counter="100"
                          :error-messages="errors"
                          label="Prenom *"
                          required
                        ></v-text-field>
                      </validation-provider>
                      
                      <validation-provider
                        v-slot="{ errors }"
                        name="Nom"
                        :rules="{
                          required: true,
                        }"
                      >
                        <v-text-field
                          v-model="client.nom"
                          :counter="20"
                          :error-messages="errors"
                          label="Nom du client *"
                          required
                        ></v-text-field>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="email"
                        rules="required|email"
                      >
                        <v-text-field
                          v-model="client.email"
                          :error-messages="errors"
                          label="E-mail"
                          required
                        ></v-text-field>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="telephone"
                        rules="required|numeric"
                      >
                        <v-text-field
                          v-model="client.telephone"
                          :error-messages="errors"
                          label="Telephone"
                          required
                        ></v-text-field>
                      </validation-provider>
                      <small>*indique les champs obligatoire</small>

                      <v-row class="text-right my-3 mx-1">
                        <v-btn @click="clear" color="#777"> Annuler </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          type="submit"
                          :disabled="invalid"
                          color="primary"
                        >
                          Envoyer
                        </v-btn>
                      </v-row>
                    </validation-observer>
                  </v-col>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-col class="my-auto" cols="12">
        <table id="customers">
          <thead>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Genre</th>
            <th>Date naiss</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>date enregister</th>
            <th>actions</th>
          </thead>
          <tbody>
            <tr v-for="c in clients" :key="c.id">
              <td>{{ c.nom }}</td>
              <td>{{ c.prenom }}</td>
              <td>{{ c.genre }}</td>
              <td>{{ c.date_naiss }}</td>
              <td>{{ c.email }}</td>
              <td>{{ c.telephone }}</td>
              <td>{{ c.date }}</td>
              <td claDakota Ricess="text-right">
                <v-btn class="" text icon color="info">
                  <v-icon>mdi-circle-edit-outline</v-icon>
                </v-btn>
                <v-btn class="" text icon color="#E33">
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>


<script>
import "../plugins/vee-validate";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "HelloWorld",

  data: () => ({
    items: ["feminin", "masculin"],
    dialog: false,
    libelle: "",
    ordre: null,
    status: false,
    client: {
      nom: "",
      prenom: "",
      date_naiss: null,
      genre: "masculin",
      email: null,
      telephone: null,
      date: Date.now(),
    },
  }),
  methods: {
    clear() {
      this.dialog = false;
      this.client = {
        nom: "",
        prenom: "",
        date_naiss: null,
        genre: "masculin",
        email: null,
        telephone: null,
        date: Date.now(),
      };
    },
    AjoutClient() {
       this.$store.dispatch("clients/addClientsAction",{
         nom: this.client.nom,
        prenom: this.client.prenom,
        date_naiss: Date.now(),
        genre: this.client.genre,
        email: this.client.email,
        telephone: this.client.telephone,
        date: Date.now(),
       });
       this.clear();
    },
    supprimerClients() {},
  },
  computed: {
    ...mapState("clients", ["clients"]),
  },
  created() {
    this.$store.dispatch("clients/getAllClients");
  },
  mounted() {
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
  },
};
</script>
<style scoped>
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #5d6be9;
  color: white;
}
</style>