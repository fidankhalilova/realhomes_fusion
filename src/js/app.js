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

    let endpoint = form.id === "products" ? "products" : "agents";

    axios.post(`${LOCAL_BASE}/${endpoint}`, data)
        .then(response => {
            console.log("Saved:", response.data);
        })
        .catch(error => {
            console.error("Error:", error);
        })
        .finally(() => {
            console.log("Fetch completed!");
        });
}

const today = new Date();

const dateString = today.toDateString();

function fetchProducts(url, cb) {
    axios.get(`${LOCAL_BASE}/${url}`)
        .then((response) => {
            cb(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            console.log("FETCH COMPLETED!");
        });
}

let ProductFetchHTMLData = document.querySelector('#productsPart');

const renderProductsHTML = (products) => {
    products.forEach((product) => {
        const productHtml = `<div id="product" class="rounded-lg shadow-[0px_0px_16px_4px_rgba(0,_0,_0,_0.1)]">
                    <div id="prod-img" class="overflow-hidden rounded-t-lg relative w-full">
                        <img src="${product?.houseImg ?? ""}"
                            alt="" class="object-cover w-[400px] h-[300px] rounded-t-lg relative duration-200 hover:scale-[1.1]">
                        <div id="like-share" class="opacity-50 absolute top-5 px-2 hover:opacity-100 text-right">
                            <i class="ri-star-line rounded-full bg-primary p-4 text-xl text-white"></i>
                            <i class="ri-share-line rounded-full bg-primary p-4 text-xl text-white"></i>
                        </div>
                    </div>
                    <div id="context" class="w-100 flex flex-col gap-4">
                        <div id="margin-sides" class="pr-6 pl-6 flex flex-col gap-2 items-start w-100">
                            <h1 class="mt-4 text-2xl text-black font-medium">${product?.title ?? "No Name"}</h1>
                            <div id="loc-added" class="flex flex-col gap-1">
                                <div id="loc" class="text-black"><i
                                        class="ri-map-pin-2-line text-primary text-md font-medium"></i> ${product?.location ?? ""}</div>
                                <div id="when-added" class="text-gray-500 text-sm ">Added: ${dateString ?? ""}</div>
                            </div>
                            <div class="text-black font-medium">
                                <i class="ri-hotel-bed-line text-primary text-md font-medium"></i> ${product?.bedroom ?? ""}
                                <i class="ri-heavy-showers-fill text-primary text-md font-medium"></i> ${product?.bathroom ?? ""}
                                <i class="ri-custom-size text-primary text-md font-medium"></i> ${product?.area ?? ""}
                            </div>
                            <div id="line" class=" w-full border border-b-gray-50/40 border-b-1"></div>
                            <div id="user-price" class="w-88 flex flex-row justify-between items-center">
                                <div id="user" class="flex flex-row gap-2 items-center">
                                    <img src="${product?.userImg ?? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0OEBAPDg4PDRAPDQ0NDw0PDQ8NDw8NFREWFhUSExMYHiggGBolGxMVITEhJSkrLi4uFx8zODMsNygtLjcBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QAMBABAQABAgQFAgQGAwAAAAAAAAECAxEEMUFxBRIhUYEysSJhksFCUqHR8PFygpH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+ogAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7mlneWOX6aDgd3Rz/AJcv01xf86AAAAAAAAAAAAAAAAAAAAAAAA608LldseYPMcbbtPW+y9oeH9c7/wBYs8Pw+OE9OfW+6eAj09HHHlJPhJsAGzjPTxvOS/DsBR1vD5fXG7X26KGphcbtlNq3UWroY5zazt+QMUSa+lcLtfi+8RgAAAAAAAAAAAAAAAAAANXgdDy4736r/SKHCafmzk6T1rYgPQAAAAAAAQcVoTPHbrOV/Zj2N+srxDT2y3nLL1+QVQAAAAAAAAAAAAAAAAAXvC8fqvaNFS8L+nLvPsugAAAAAAAAKXieP4Zfarqr4j9F7wGUAAAAAAAAAAAAAAAAAC/4Zl9U7VoMbg9Ty5y9L6VswAAAAAAAABT8Ty/DJ75LjK8Q1N8tt95j6fIKoAAAAAAAAAAAAAAAAADV4HiPPjtfqx59vdlOtLUuN3nMG6IOH18c56c+sTgAAAAAj1tXHCb34nWg54rWmGO/W+knvWNbv63rzv5pNfWud3vxPZGAAAAAAAAAAAAAAAAAAAAD3HKy7y7Ve0ePnLOfMUAG5p6mOX05S9r+ztgb/wCcnc1s5yyy/wDaDcc554487J3uzGuvqfz5fqqO0GjrcfjPTGb/AJ9FDU1Lld7d3IAAAAAAAAAAAAAAAAAAAAACbR4bPPlNp73kCF7jLeU37erT0uBwnP8AF9lnHGTlJAZGPC6l5YX52n3dzgdT2k+Y1dnoMq8Bqe0vyjy4XUn8F+Nr9my8BhZY2c5Z3mzxvXGXnJVbV4LDLlPLfyBlCxrcJnj08095+6uAAAAAAAAAAAAAAAAA9xxtu0m99nunjbdpN61eF4aYT3vWgi4fgpPXP1vt0i5I9AAAAAAAAAebKvEcHMvWbY3+lWwGFqYXG7WbX7uWzr6Ezm159KydbTuN2v8AuA4AAAAAAAAAAAABb8O0fNfNeWPLuC1wXD+Sb3nfXt+S0QAAAAAAAAAAAAAQcXoTPHbrzlTgMHKbWy+m3R4v+JaPLOdsv7qAAAAAAAAAAAEbXD6flxk/L17svg8d88e+7YgPQAAAAAAAAAAAAAAAc6mMssvKzZiamHltl5y7N2srxHHbPvICqAAAAAAAAACbhMts8e7YjBl9m1w2rM8ZZ89wSgAAAAAAAAAAAAAAAMnxC/j7ST5aernMZbejF1M7lbb1u4OQAAAAAAAAAF/wn+Pvj9noC+AAAAAAAAAAAAAAACn4p9E/54sz+9AAAAAAAH//2Q=="}"
                                        alt="" class="w-[30px] h-[30px] rounded-full">
                                    <h3>${product?.fullName ?? ""}</h3>
                                </div>
                                <div id="price" class="text-primary text-md font-medium text-2xl">$${product?.price ?? ""}</div>
                            </div>
                        </div>
                        <div id="srcs" class="flex flex-row justify-between w-88">
                            <div id="each-src"
                                class="px-[11px] rounded-bl-lg py-2 shadow-[0px_0px_16px_4px_rgba(0,_0,_0,_0.1)] font-medium text-[15px] flex flex-row gap-2">
                                <i class="ri-heart-fill text-primary"></i> Favorites
                            </div>
                            <div id="each-src"
                                class="px-[11px] py-2 shadow-[0px_0px_16px_4px_rgba(0,_0,_0,_0.1)] font-medium text-[15px] flex flex-row gap-2">
                                <i class="ri-arrow-left-right-line text-primary"></i> Compare
                            </div>
                            <div id="each-src"
                                class="px-[11px] py-2 shadow-[0px_0px_16px_4px_rgba(0,_0,_0,_0.1)] font-medium text-[15px] flex flex-row gap-2">
                                <i class="ri-image-line text-primary"></i> Images
                            </div>
                            <div id="each-src"
                                class="px-[11px] rounded-br-lg py-2 shadow-[0px_0px_16px_4px_rgba(0,_0,_0,_0.1)] font-medium text-[15px] flex flex-row gap-2">
                                <i class="ri-video-on-fill text-primary"></i> Videos
                            </div>
                        </div>
                    </div>
                </div>`
        ProductFetchHTMLData.innerHTML += productHtml;
    });
};

let AgentFetchHTMLData = document.querySelector('#agentsPart');

const renderAgentProductsHTML = (agents) => {
    agents.forEach((agent) => {
        const agentHtml = `<div id="agent" class="flex flex-col items-center justify-start gap-4">
                    <div id="image" class="w-[252px] h-[320px] rounded-lg overflow-hidden">
                        <img src="${agent?.photo ?? ""}"
                            alt="" class="object-cover w-[252px] h-[320px] rounded-lg shadow-[0px_0px_41px_3px_rgba(0,_0,_0,_0.1)] duration-200 hover:scale-[1.1]">
                    </div>
                    <div id="name">
                        <h1 class="text-black font-semibold text-[20px] hover:text-primary">${agent?.title ?? ""} <i
                                class="ri-checkbox-circle-fill text-blue-400"></i></h1>
                    </div>
                </div>`
        AgentFetchHTMLData.innerHTML += agentHtml;
    });
};

fetchProducts("products", (data) => {
    renderProductsHTML(data);
    console.log(data);
})

fetchProducts("agents", (data) => {
    renderAgentProductsHTML(data);
    console.log(data);
})