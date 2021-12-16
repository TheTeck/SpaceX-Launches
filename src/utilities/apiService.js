function getData () {
    return fetch ('https://api.spacexdata.com/v2/launches', {
        method: 'GET'
    }).then(res => res.json());
}

const apiService = {
    getData
}

export default apiService;