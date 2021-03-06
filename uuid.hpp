#ifndef RHIZOME_TYPES_UUID_HPP
#define RHIZOME_TYPES_UUID_HPP


#define RHIZOME_UUID_LENGTH 64

#include <string>
#include <sstream>
#include <random>
#include "core/thing.hpp"



using std::string;
using std::default_random_engine;
using std::uniform_int_distribution;
using std::stringstream;

using rhizome::core::Thing;

namespace rhizome {
    namespace types {
        static default_random_engine r;
        static uniform_int_distribution<int> dist(0,255);

        class UUID: public Thing {
        private:
            string value;
            
        public:
            UUID();

            bool operator==( UUID const &b ) const;

            // virtual Pattern * make_pattern() const override;
            // virtual Pattern * make_concise_pattern() const override;
            virtual void serialize_to( ostream &out ) const override;
            // virtual void deserialize_from( istream &in, IParser *parser ) override;
            virtual Thing * clone() const override;
            virtual string rhizome_type() const override;
            virtual bool has_interface(string const &name) override;
        };
    }
}

#endif
