
import axios from "axios"
export function fetchItem({ commit }) {
    return axios.get("https://cat-fact.herokuapp.com/facts").then((res) => {
        commit('getData', res.data)

    })

}
