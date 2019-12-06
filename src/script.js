let req = new Request('monologe.json');

fetch(req)
.then(function(response) {
    if (!response.ok) {
        throw new Error('HTTP error, status = ' + response.status);
    }
    return response.blob();
})
.then(function(response) {
    console.log(response);
});