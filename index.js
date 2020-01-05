const request = require('request-promise');
const domains = {};

const register_type = function(d,p,t) {
    if( !domains[d]) {
        domains[d] = {};
    }
    domains[d][p] = t;
};

const fetch_type = async function ( domain, path )  {
    let url = domain + '/' + path + ".json";
    let result = await request.get( url, { json: true } );
    register_type(domain,path,result);
};

fetch_type( "http://localhost:4000", "putnam-loop/ns/User");
fetch_type( "http://localhost:4000", "putnam-loop/ns/Eatery");
fetch_type( "http://localhost:4000", "putnam-loop/ns/Event");
fetch_type( "http://localhost:4000", "putnam-loop/ns/Park");