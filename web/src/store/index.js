import {createStore} from "vuex";

export default createStore({
    state: {
        isAuth: false,
        jwtToken: null,
        user: null,
    },
    mutations: {
        setJwtToken(state, token, user){
            state.jwtToken = token
            state.user = user
            state.isAuth = true
        },
        logOut(state) {
            state.jwtToken = null
            state.user = null
            state.isAuth = false
        }
    }
})