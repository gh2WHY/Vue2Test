/**
 * 表格定制列
 * @type {{
* deviceColumn: []
* }}
*/
const state = {
  deviceColumn: []
}
const mutations = {
 changeDeviceColumn: (state, payload) => {
   state.deviceColumn = payload
 },
}
const actions = {}
export default {
 namespaced: true,
 state,
 mutations,
 actions
}