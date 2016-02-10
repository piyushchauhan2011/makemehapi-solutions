'use strict';

module.exports = function(context) {
    const query = context.data.root.query;
    let name = query.name;
    let suffix = query.suffix;
    return name + suffix;
}