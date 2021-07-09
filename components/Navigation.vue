<template>
  <div class="navmenu">
    <nuxt-link to="/">
      <img src="../assets/logo.png" alt="LOGO" />
    </nuxt-link>
    <div class="navlinks">
      <b-button type="is-medium" rounded class="new-intern">+</b-button>
      <nuxt-link class="link" to="/interns"
        ><b-icon icon="format-list-numbered"></b-icon>Stagiaires</nuxt-link
      >
      <a class="link"><b-icon icon="clock-check"></b-icon>Pointage</a>
      <a class="link"><b-icon icon="cog"></b-icon>Option</a>
      <span></span>
      <a class="link">Connexion</a>
    </div>
  </div>
</template>

<style>
.navmenu {
  display: grid;
  justify-items: center;
  row-gap: 26px;
  grid-template-columns: 1fr;
  grid-template-rows: min-content auto;
}

.navlinks {
  display: grid;
  justify-self: center;
  align-self: stretch;
  column-gap: 0px;
  row-gap: 0px;
  grid-template-columns: 100%;
  grid-auto-rows: 1fr;
  grid-template-rows: 75px repeat(3, 35px) auto 35px;
}

.link {
  color: black;
  font-size: 16px;
  line-height: 30px;
  font-weight: 700;
  text-align: left;
}
.new-intern {
  background-color: #246530;
  color: white;
}
i {
  margin-right: 10px;
}
</style>
