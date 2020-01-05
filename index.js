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

    sql_dbname() {
        return this.domain.replace( /[^\w]+/gi, '_');
    }

    sql_type( t,l ) {
        if( t==='string' ) {
            return 'varchar(' + l + ')';
        } else if( t==='integer') {
            return 'bigint';
        } else if( t==='text') {
            return 'text(' + l + ')';
        } else if( t==='datetime') {
            return 'datetime';
        } 
        throw new Error("No SQL mapping defined for type " + t);
    }

    sql_columns() {
        let cs = '';
        for( let d in this.columns ) {
            let c = this.columns[d];
            cs = cs + '\t' + c.name + ' ' + this.sql_type(c.type,c.max_length);
            cs = cs + ',\n';
        }
        cs = cs + '\t' + 'id INTEGER UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY';
        return cs;
    }

    sql_tablename( path ) {
        return path.replace(/[^\w]+/gi,'_');
    }

    

    sql_create() {
        return 'CREATE TABLE ' + this.sql_dbname() + '.' + this.sql_tablename(this.path) + ' (\n' + 
            this.sql_columns() + 
        ');';
    }

    sql_create_db() {
        return "IF DB_ID[" + this.sql_dbname() + "] is null\n\t"
            +     "CREATE DATABASE " + this.sql_dbname() + ";\n\n";
    }

    sql_drop() {
        return "DROP TABLE " + this.sql_dbname + '.' + this.sql_tablename(this.path) + ';';
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
    console.log(domains['http://localhost:4000']["putnam-loop/ns/User"].sql_create_db());
    console.log(domains['http://localhost:4000']["putnam-loop/ns/User"].sql_create());
    console.log(domains['http://localhost:4000']["putnam-loop/ns/Eatery"].sql_create());
    console.log(domains['http://localhost:4000']["putnam-loop/ns/Event"].sql_create());
    console.log(domains['http://localhost:4000']["putnam-loop/ns/Park"].sql_create());
})();