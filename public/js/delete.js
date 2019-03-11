function deleteMovie() {
    const id = document.getElementById('id').value;
    const url = `/delete/${id}`;
    axios.delete(url)
        .then((res) => {
            
            window.location.href = '/';
        })
        .catch((err) => {
            alert(err);
        });
}