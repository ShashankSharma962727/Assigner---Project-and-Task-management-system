const bcrypt = require('bcrypt');

const hashPass = async (pass) => {
    const hash = await bcrypt.hash(pass, 12);

    return hash;
}

module.exports = hashPass;