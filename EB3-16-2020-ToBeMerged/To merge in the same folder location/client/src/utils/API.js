import axios from "axios";


export default {
    //Gets all Campaign names
    login: function (data) {
        return axios.post('/api/auth', data);
    },
    createAccount: function (data) {
        return axios.post('/api/auth/create', data);
    },
    getUser: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/user/getUser', data, {headers: {
            'x-access-token': token
        }})
    },
    updateUser: function(data){
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/user/updateUser', data, {headers: {
            'x-access-token':token
        }})
    },
    getSearchResults: function(data){
        console.log('Doing post');
        console.log('Data in post ' + data);
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/search/getSearchResults', data, {headers: {
            'x-access-token':token
        }})
    },
    add: function(data) {
        return axios.post('/api/ShoppingCart/add', data);
    },
    delete: function(data) {
        return axios.post('/api/ShoppingCart/delete', data);
    },
    displayAll: function(data) {
        return axios.post('/api/ShoppingCart/displayAll', data);
    },
    componentDidMount: function(data) {
        console.log("I reached componentDidMount");
        return axios.get('/api/ShoppingCart', data);
    },
};