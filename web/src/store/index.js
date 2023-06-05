import {createStore} from "vuex";

export default createStore({
    state: {
        isAuth: false,
        jwtToken: null,
    },
    mutations: {
        setJwtToken(state, token){
            state.jwtToken = token
            state.isAuth = true
        },
        logOut(state) {
            state.jwtToken = null
            state.isAuth = false
        }
    }
})