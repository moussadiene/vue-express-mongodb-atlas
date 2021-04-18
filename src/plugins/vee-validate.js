import Vue from 'vue'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate'
import {
  email,
  max,
  numeric,
  required,
  regex,
  digits,
} from 'vee-validate/dist/rules'



// extend('email', email)
// extend('max', max)
// extend('min', min)
extend('numeric', {
  ...numeric,
  message: '{_field_} doit etre numerique'
})
// extend('required', required)
extend('digits', {
  ...digits,
  message: '{_field_} doit etre {length} chiffre. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} ne doit pas être vide',
})

extend('max', {
  ...max,
  message: '{_field_} ne doit etre superieur {length} caracteres',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} doit respecter {regex}',
})

extend('email', {
  ...email,
  message: 'Email doit être valide',
})

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)