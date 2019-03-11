function getQueries(queries) {
    let { search, sort } = queries;
    search ? 
        search = {$or: [{ title: search },{ stars: search }]}
        :
        search = {};

        
    switch (sort) {
        case '1':
            sort = { title: 1 }
            break;

        case '-1':
            sort = { title: -1 }
            break;
    
        default:
            sort = { $natural: -1 }
            break;
    }
    return { search, sort };
}

module.exports = getQueries;