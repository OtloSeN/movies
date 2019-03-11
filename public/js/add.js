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
    const title = document.getElementById('name').value;
    const releaseYear = document.getElementById('year').value;
    const format = document.getElementById('format').value;
    const stars = [];
    
    const nodeList = document.querySelectorAll('li');
    nodeList.forEach(node => {
        stars.push(node.innerHTML);
    });

    axios.post('/add', {
            title,
            releaseYear,
            format,
            stars
        })
        .then((res) => {
            window.location.href = '/';
        })
        .catch((err) => {
            alert(err);
        });
}