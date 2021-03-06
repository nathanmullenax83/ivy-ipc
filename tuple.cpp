#include "tuple.hpp"

namespace rhizome {
    namespace types {
        Tuple::Tuple() {

        }

        Tuple::~Tuple() {
            for(size_t i=0; i<items.size(); ++i) {
                delete items[i];
                items[i] = NULL;
            }
        }

        // Pattern *
        // Tuple::make_concise_pattern() const {

        // }

        // Pattern *
        // Tuple::make_pattern() const {

        // }

        Thing *
        Tuple::clone() const {
            Tuple *copy = new Tuple();
            for(size_t i=0; i<items.size(); ++i) {
                copy->append( items[i]->clone() );
            }
            return copy;
        }

        void 
        Tuple::serialize_to( ostream &out ) const {
            out << "(";
            for(size_t i=0; i<items.size();++i) {
                items[i]->serialize_to(out);
                if( i < items.size()-1) {
                    out << ",";
                }
            }
            out << ")";
        }

        // void
        // Tuple::deserialize_from( istream &in, IParser *parser ) {
        //     parser->parse_thing(in, "<Tuple>");
        // }

        string
        Tuple::rhizome_type() const {
            stringstream tn;
            for(size_t i=0; i<items.size();++i) {
                tn << items[i]->rhizome_type();
                if( i < items.size()-1 ) {
                    tn << '*';
                }
            }
            return tn.str();
        }


        void Tuple::append( Thing *thing ) {
            items.push_back(thing);
        }

        void Tuple::prepend( Thing *thing ) {
            items.push_front(thing);
        }

        Thing * Tuple::at( size_t i ) {
            return items.at(i);
        }

        bool
        Tuple::has_interface(string const &w) {
            return (w==rhizome_type()||w=="Thing");
        }

        size_t Tuple::size() const { return items.size(); }

    }
}