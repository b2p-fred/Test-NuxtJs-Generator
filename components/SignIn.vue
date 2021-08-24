<template>
  <v-row justify="center">
    <v-dialog
      v-model="visible"
      persistent
      max-width="600px"
    >
      <v-form v-model="valid" action="/home" @submit.prevent="login">
        <v-card>
          <v-card-title>
            <span class="text-h5">Sign in</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginData.email"
                    label="Email*"
                    required
                    :rules="[required('e-mail')]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginData.password"
                    :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword1 ? 'text' : 'password'"
                    label="Password*"
                    persistent-hint
                    required
                    clearable
                    :rules="[required('Password')]"
                    @click:append="showPassword1 = !showPassword1"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="visible = false"
            >
              Close
            </v-btn>
            <v-btn
              type="submit"
              color="green darken-1"
              text
              :disabled="!valid"
            >
              Sign in
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    visible: true,
    valid: false,
    showPassword1: false,
    // Form fields
    loginData: {
      email: "",
      password: "",
    },
    // Form rules
    required(property) {
      return v => !!v || `${property} is mandatory.`
    },
  }),
  methods: {
    async login() {
      this.visible = false;

      this.$toast.show('Logging in...')

      // // Login on B2P SSO
      // // todo: CORS problems on GET OPTIONS
      // await this.$auth.loginWith('b2p', {
      //   data: {
      //     email: this.username,
      //     password: this.password
      //   },
      // });

      try {
        // Login on SF5 - /api/login with JWT
        await this.$auth.loginWith("local", {
          data: this.loginData
        });
        this.$toast.success('Successfully authenticated')
        await this.$router.push("/");
      } catch (e) {
        this.$toast.error('credentials')
        this.visible = true;
      }
    }
  }
}
</script>
