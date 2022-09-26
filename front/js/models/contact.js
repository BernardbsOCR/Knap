/**
* Class Contact
* - Object contain all client data
*/

class Contact {
    /**@type{String} firstName*/
    firstName;
    /**@type{String} lastName*/
    lastName;
    /**@type{String} address*/
    address;
    /**@type{String} city*/
    city;
    /**@type{String} email*/
    email;

    /**
     * @constructor Initializing Contact instance
     * 
     * @param {String} firstName 
     * @param {String} lastName 
     * @param {String} address 
     * @param {String} city 
     * @param {String} email 
     */
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