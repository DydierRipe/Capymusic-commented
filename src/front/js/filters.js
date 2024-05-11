// complex verification filters for sign up or log in

class filter {
    static username(un) {
        let canBeSent = true, rejectReason = "";
        
        if (un.value.length < 4) { // longer than 4 characters usernames
            canBeSent = false;
            rejectReason = "length";
        } else if (!/^[a-zA-Z0-9_-]*$/.test(un.value)) { // username only can have alphanumeric characters, _ and -
            canBeSent = false;
            rejectReason = "NVC"; // non valid characters
        }

        if (canBeSent) {
            return ["acepted"];
        } else { 
            return ["rejected", rejectReason];
        }
    }

    static email(email) {

        if (!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) { // email super complex verification (im a hacker :000)
            return ["rejected"];
        } else {
            return ["acepted"];
        }
    }
}