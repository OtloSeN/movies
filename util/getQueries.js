function getQueries(queries) {
    let { sort, search } = queries;
    search ?
        search = { $or: [
            { title: { $regex: search, $options: 'i' } },
            { stars: { $regex: search, $options: 'i' } }
        ]}
        //search = {$or: [{ title: search },{ stars: search }]}
        :
        search = {};

        
    switch (sort) {
        case 'A-Z':
            sort = { title: 1 }
            break;

        case 'Z-A':
            sort = { title: -1 }
            break;

        case 'Newest':
            sort = { $natural: -1 }
            break;
    
        default:
            sort = { $natural: 1 }
            break;
    }
    return { search, sort };
}

module.exports = getQueries;