#ifndef RHIZOME_TYPES_DIR_HPP
#define RHIZOME_TYPES_DIR_HPP
#include <string>
#include "core/thing.hpp"

using rhizome::core::Thing;
using std::string;

namespace rhizome {
    namespace types {
        class Dir: public Thing {
        private:
            string path;

            /// Check if /path/ exists.
            
        public:
            static bool dir_exists( string const &name );
            static bool dir_create( string const &name );
            

            Dir();
            Dir( string const &name );

            string prefix() const;

            virtual string rhizome_type() const override;
            virtual bool has_interface( string const &name ) override;
            virtual void serialize_to( std::ostream &out ) const override;
            virtual Thing * clone() const override;

        };
    }
}

#endif