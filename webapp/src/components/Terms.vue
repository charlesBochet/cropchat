<template>
  <div class="terms-area">

      <h3>{{$t('Terms and conditions')}}</h3>

        <!-- <div dir="ltr" class="input-group">
          <span class="input-group-addon" :title="$t('Country')" id="POS_country-addon1"> <i class="fa fa-globe fa-fw" aria-hidden="true"></i> {{$t('Select Country')}} </span>
          <select class="form-control" aria-describedby="POS_country-addon1" @change="changedCountry" v-model="selected_country">
            <option v-for="country in countries" :selected="selected_country" :value="country.code">{{$t(country.name)}}</option>
          </select>
        </div>
        <hr> -->
        {{getCurrentTerms}}


  </div>
</template>

<script>
export default {
  props: {
    selected_country: {
      type: String,
      default: 'FR'
    }
  },
  data () {
    return {
      currentTerms: `
      De conformidad con la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal, le informamos que los datos de carácter personal que has proporcionado a la asociación Micro Hucha Solidaria están incluidos en un fichero automatizado el responsable del cual es la asociación Micro Hucha Solidaria, también se facilitarán su nombre y appellidos a las entidades destinatarias de los donativos (Asociaciones o Fundaciones) para la tramitación de su donativo. Asimismo, le informamos que puede ejercer los derechos de acceso, rectificación, cancelación y oposición de sus datos solicitándolo por correo electrónico: lopd@microhuchasolidaria.org con una fotocopia de su DNI o documento equivalente para comprobar su identidad.
      `,
      countries: [
        {
          'name': 'Spain',
          'db': 'mhs',
          'code': 'ES'
        },
        {
          'name': 'France',
          'db': 'jva',
          'code': 'FR'
        }
      ],
      terms: {
        'en': `
        In accordance with the law 15/1999 of December 13th for the protection of personal data, we inform you that the personal data you have provided are included in an automated file property  of charity Je Vais Aider. Your first name and lastname will also be provided to the charities receiving your donations to process your donation. We also inform you that you can exercise your rights of access, rectification, cancellation and opposition of your data by e-mail to info@jevaisaider.org with proof of your identity.`,
        'es': `
        De conformidad con la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal, le informamos que los datos de carácter personal que has proporcionado a la asociación Micro Hucha Solidaria están incluidos en un fichero automatizado el responsable del cual es la asociación Micro Hucha Solidaria, también se facilitarán su nombre y appellidos a las entidades destinatarias de los donativos (Asociaciones o Fundaciones) para la tramitación de su donativo. Asimismo, le informamos que puede ejercer los derechos de acceso, rectificación, cancelación y oposición de sus datos solicitándolo por correo electrónico: lopd@microhuchasolidaria.org con una fotocopia de su DNI o documento equivalente para comprobar su identidad.
        `,
        'fr': `
        Conformément à la loi 15/1999 du 13 décembre de protection des données personnelles, nous vous informons que les données personnelles que vous avez fournies sont inclus dans un fichier automatisé titulaire de l'association Je Vais Aider, votre nom et prénom seront également fournies aux entités destinataires des dons (associations ou fondations) pour le traitement de vos dons. Nous vous informons également que vous pouvez exercer vos droits d'accès, de rectification, annulation et opposition de vos données par courriel avec une preuve de votre identité: info@jevaisaider.org
        `
      }
    }
  },
  watch: {

  },
  methods: {
    changedCountry () {
      console.log('changed country')
      console.log(this.POS_country)
      this.currentTerms = this.terms[this.selected_country.toLowerCase()]
    },
    getTerms (lang) {
      console.log('terms')
      var t = this.terms[lang]
      if (t) {
        return t.trim()
      }
      return this.terms.en
    },
    updateTerms (lang) {
      this.currentTerms = this.terms['en']
    }
  },
  computed: {
    getCurrentTerms () {
      this.currentTerms = this.terms[this.selected_country.toLowerCase()]
      return this.currentTerms
    }
  }
}
</script>
<style scoped>
h1, h2, h3, h4, h5 {
  font-weight: bold;
}
h1 {
  font-size: 1.6em;
}
h2{
  font-size: 1.45em;
}
h3{
  font-size: 1.3em;
}
h4 {
  font-size: 1.15em;
}
h5 {
  font-size: 1em;
}
.terms-area {
  overflow-y: scroll;
  height: 220px;
}
</style>
