class Contact {
    firstName;
    lastName;
    address;
    city;
    email;

    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }

    get firstName () {
        return this.firstName;
    }

    get lastName () {
        return this.lastName;
    }

    get address () {
        return this.address;
    }

    get city () {
        return this.city;
    }

    get email () {
        return this.email;
    }
}