function deleteMovie() {
    const slug = document.getElementById('slug').value;
    const url = `/${slug}/delete`;
    console.log(url);
    
    axios.delete(url)
        .then((res) => {
            console.log(456);
            
            window.location.href = '/';
        })
        .catch((err) => {
            alert(err);
        });
}