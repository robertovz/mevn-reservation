import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let compareItems = window.localStorage.getItem('compareItems');
let lastItem = window.localStorage.getItem('lastItem');

export default new Vuex.Store({
    state: {
        compareItems: compareItems ? JSON.parse(compareItems) : [],
        lastItem: lastItem ? JSON.parse(lastItem) : [],
        search: ''
    },

    mutations: {

        addLastItem(state, item) {
            state.lastItem = item;
            this.commit('storeItem');
        },

        storeItem(state) {
            window.localStorage.setItem('lastItem', JSON.stringify(state.lastItem));
        },

        searchit(state, item) {
            state.search = item;
            Fire.$emit('searching');
        },

        addToCompareItems(state, item) {
            console.log(item);
            let found = state.compareItems.find(product => product.id == item.id);

            if (!found) {
                state.compareItems.push(item);
            }

            this.commit('storeCompareItems');
        },

        storeCompareItems(state) {
            window.localStorage.setItem('compareItems', JSON.stringify(state.compareItems));
        },

        removeFromCompareItems(state, item) {
            let index = state.compareItems.indexOf(item);

            state.compareItems.splice(index, 1);

            this.commit('storeCompareItems');
        }

    },


})