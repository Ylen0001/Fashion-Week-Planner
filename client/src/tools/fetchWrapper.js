class Fetchwrapper {
    constructor(baseURL){
        this.baseURL = baseURL;
    }

    #send(method, endpoint, body){
        return fetch(this.baseURL + endpoint, {
            method: method,
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    }

    put(endpoint, body){
        return this.#send("put", endpoint, body);
    }

    post(endpoint, body){
        return this.#send("post", endpoint, body);
    }

    delete(endpoint, body){
        return this.#send("delete", endpoint, body);
    }

    get(endpoint){
        return this.#send("get", endpoint);
    }
}