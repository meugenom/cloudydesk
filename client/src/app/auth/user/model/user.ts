export class User {
    private firstName: string;
    private lastName: string;
    private email : string;
    private password: string;
    private roles: string;
    private isActive:boolean;
	

    constructor(firstName: string,
                lastName: string,
                email: string,
                password: string,
                roles: string,
                isActive: boolean) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.isActive = isActive;
    }


    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(value: string) {
        this.lastName = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(password: string){
        this.password = password;
    }

    getRoles(): string {
        return this.roles;
    }

    setRoles(roles: string) {
        this.roles = roles;
    }

    getIsActive(): boolean {
        return this.isActive;
    }

    setIsActive(isActive: boolean) {
        this.isActive = isActive;
    }

    toString(): string {
        return `User: [${this.firstName}, ${this.lastName}, ${this.email}, ${this.roles}, ${this.isActive}]`;
    }

}