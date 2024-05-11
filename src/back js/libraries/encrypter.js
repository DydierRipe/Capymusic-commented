const bcrypt = require("bcrypt");

// encrypts passwords lol

const func = async a => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(a, salt);
    console.log(hashedPassword);
}

func("Dydier10347804261");


