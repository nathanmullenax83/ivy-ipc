#ifndef RHIZOME_TYPES_FRACTION
#define RHIZOME_TYPES_FRACTION


#include <iostream>

#include "core/thing.hpp"
#include "integer.hpp"


using rhizome::core::Thing;

namespace rhizome {
    namespace types {
        class Fraction: public Thing {
        public:
            Integer numerator;
            Integer denomenator;

            Integer gcd( Integer a, Integer b );
        public:
            /// Create and reduce a fraction.
            Fraction( Integer numerator, Integer denominator );


            //virtual rp::Pattern * make_pattern() const;
            //virtual rp::Pattern * make_concise_pattern() const;

            friend std::ostream & operator<< ( std::ostream &out, Fraction const &q  );

            virtual void serialize_to(ostream &out) const override;
            //virtual void deserialize_from( istream &in, IParser *parser ) override;
            
            Fraction operator+ ( Fraction const &f2 ) const;

            virtual Thing * clone() const override;
            virtual string rhizome_type() const override;

            virtual bool has_interface( string const &w ) override;
        };
    }
}

#endif
