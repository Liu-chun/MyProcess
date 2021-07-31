
import Vue from 'vue';
import Vuex from 'vuex';

import app from "./modules/app";
import user from "./modules/user";
import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex)

export default new Vuex.Store({
  app,
  user,
  state,
  actions,
  getters,
  mutations
})
