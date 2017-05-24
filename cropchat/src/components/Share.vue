<template>
  <div>
    <social-sharing url="https://github.com/YoQuieroAyudar/fundraising-API-user-widget"
                      title="Fundraising API user widget"
                      description="Working on a vueJS user widget that works with # fundraising API. Work in progress..."
                      quote="This registration form is designed to a compact web-component, to be easily integrated/personalized in a third-party website"
                      hashtags="fundraising,user,widget"
                      twitter-user="YQuieroAyudar"
                      v-cloak inline-template>
    <div>
        <ul>
          <li>
            <network network="facebook" id="facebook">
              <i class="fa fa-fw fa-facebook"></i> Facebook
            </network>
          </li>
          <li>
            <network network="googleplus" id="googleplus">
              <i class="fa fa-fw fa-google-plus"></i> Google +
            </network>
          </li>
          <li>
            <network network="linkedin" id="linkedin">
              <i class="fa fa-fw fa-linkedin"></i> LinkedIn
            </network>
          </li>
          <li>
            <network network="pinterest" id="pinterest">
              <i class="fa fa-fw fa-pinterest"></i> Pinterest
            </network>
          </li>
          <li>
            <network network="reddit" id="reddit">
              <i class="fa fa-fw fa-reddit"></i> Reddit
            </network>
          </li>
          <li>
            <network network="twitter" id="twitter">
              <i class="fa fa-fw fa-twitter"></i> Twitter
            </network>
          </li>
          <li>
            <network network="vk" id="vk">
              <i class="fa fa-fw fa-vk"></i> VKontakte
            </network>
          </li>
          <li>
            <network network="weibo" id="weibo">
              <i class="fa fa-fw fa-weibo"></i> Weibo
            </network>
          </li>
          <li>
            <network network="whatsapp" id="whatsapp">
              <i class="fa fa-fw fa-whatsapp"></i> Whatsapp
            </network>
          </li>
        </ul>
      </div>
    </social-sharing>

  </div>

</template>

<script>
export default {
  methods: {

  }
}
</script>
