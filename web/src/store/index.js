import {createStore} from "vuex";

export default createStore({
    state: {
        isAuth: false,
        jwtToken: null,
        user: null,
    },
    mutations: {
        setJwtToken(state, payload){
            state.jwtToken = payload.token
            state.user = payload.user
            state.isAuth = true
        },
        logOut(state) {
            state.jwtToken = null
            state.user = null
            state.isAuth = false
        }
    }
})