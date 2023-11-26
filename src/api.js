class Api {

    constructor() {
        this.endpoint = import.meta.env.VITE_API_STREAM
    }

    getStatus(){
        return fetch(`${this.endpoint}/status`)
            .then(res => res.json())
    }

}

export default Api