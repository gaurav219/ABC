const { Model } = require('objection')


class Users extends Model {
    static get name() {
        return 'name'
    }
}

module.exports = Users
