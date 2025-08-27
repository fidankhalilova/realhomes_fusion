let LOCAL_BASE = "http://localhost:3000";

let products = document.querySelector('#products');
let agents = document.querySelector('#agents');

products && products.addEventListener('submit', handleSubmit);
agents && agents.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let data = Object.fromEntries(formData);
    let jsonData = JSON.stringify(data);

    let endpoint = form.id === "products" ? "products" : "agents";

    fetch(`${LOCAL_BASE}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }).then(res => res.json())
        .then(result => console.log(result.data))
        .catch(err => console.log(err))
        .finally(console.log("Fetch completed!"));
}


axios.get(`${LOCAL_BASE}/products`)
    .then(res => {
        console.log(res);
    });

axios.get(`${LOCAL_BASE}/agents`)
    .then(res => {
        console.log(res);
    });