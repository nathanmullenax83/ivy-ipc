#include "uuid.hpp"

namespace rhizome {
    namespace types {
        UUID::UUID() {
            stringstream s;
            for(size_t i=0; i<RHIZOME_UUID_LENGTH; ++i) {
                s << (char) (dist(r));
            }
            value = s.str();
        }

        bool
        UUID::operator== ( UUID const &b ) const {
            return value==b.value;
        }

        

        void
        UUID::serialize_to(ostream &out) const {
            out << rhizome_type() << "(" << value;
            out << ")";
        }

        string
        UUID::rhizome_type() const {
            return "UUID";
        }

        bool
        UUID::has_interface(string const &w) {
            return (w==rhizome_type()||w=="Thing");
        }
    }
}