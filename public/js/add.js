function addActor() {  
    let actor = document.getElementById('actor').value;

    if(actor) {
        let li = document.createElement("LI");
        let textnode = document.createTextNode(actor);

        li.appendChild(textnode);
        document.getElementById("actors-list").appendChild(li);
    }
}

function addMovie() {
    const title = document.getElementById('title').value.trim();
    const releaseYear = document.getElementById('releaseYear').value.trim();
    const format = document.getElementById('format').value.trim();
    const stars = [];
    
    const nodeList = document.querySelectorAll('li');
    nodeList.forEach(node => {
        stars.push(node.innerText);
    });    

    axios.post('/add', {
            title,
            releaseYear,
            format,
            stars
        })
        .then((res) => {
            if(res.data.isJoi) {
                const errors = res.data.details;
                
                errors.forEach(error => {
                    const input = document.getElementsByName(error.context.key)[0];

                    input.classList.add('alert-danger',  'invalid'); 
                    input.value = '';
                    input.placeholder = error.message;                    
                });
            } else {
                window.location.href = '/';
            }
        })
        .catch((err) => {
            alert(err);
        });
}