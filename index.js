const request = require('request-promise');
const domains = {};

class Model {

    constructor(domain, path, json) {
        this.columns = [];
        this.domain = domain;
        this.path = path;
        Object.keys(json).map( (k,i) => {
            this.columns.push( {
                ...json[k],
                name:k
            } );
        });
    }

    dbname() {
        return this.domain.replace( /[^\w]+/gi, '_');
    }

    sql_type( t,l ) {
        if( t==='string' ) {
            return 'varchar(' + l + ')';
        } else if( t==='integer') {
            return 'bigint';
        } else if( t==='text') {
            return 'text(' + l + ')';
        }
        throw new Error("No SQL mapping defined for type " + t);
    }

    sql_columns() {
        let cs = '';
        for( let d in this.columns ) {
            let c = this.columns[d];
            cs = cs + '\t' + c.name + ' ' + this.sql_type(c.type,c.max_length);
            if( d < this.columns.length-1 ) {
                cs = cs + ',\n';
            } else {
                cs = cs + '\n';
            }
        }
        return cs;
    }

    create() {
        return 'CREATE TABLE ' + this.dbname() + '.' + this.path + ' (\n' + 
            this.sql_columns() + 
        ');';
    }
};

const register_type = function(d,p,t) {
    if( !domains[d]) {
        domains[d] = {};
    }
    domains[d][p] = new Model(d,p,t);
};

const fetch_type = async function ( domain, path )  {
    let url = domain + '/' + path + ".json";
    let result = await request.get( url, { json: true } );
    if( result ) {
        register_type(domain,path,result);
    } else {
        throw new Error("Malformed JSON in type " + path + " from " + domain) ;
    }
};



(async () => {
    await fetch_type( "http://localhost:4000", "putnam-loop/ns/User");
    await fetch_type( "http://localhost:4000", "putnam-loop/ns/Eatery");
    await fetch_type( "http://localhost:4000", "putnam-loop/ns/Event");
    await fetch_type( "http://localhost:4000", "putnam-loop/ns/Park");
    console.log(domains['http://localhost:4000']["putnam-loop/ns/User"].create());
})();