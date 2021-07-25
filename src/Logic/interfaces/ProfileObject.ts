interface ProfileObject {
    information: ProfileInformation,
    shipping: ProfileShipping,
    billing: ProfileBilling,
    payment: ProfilePayment
    settings: ProfileSettings
}

export interface ProfileInformation {
    name: string,
    email: string,
    phone: string,
}

export interface ProfileShipping {
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    zip: string,
    city: string,
    state: string,
    country: string,
}

export interface ProfileBilling {
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
    zip: string,
    city: string,
    state: string,
    country: string,
}

export interface ProfilePayment {
    name: string,
    number: string,
    expiryMonth: string,
    expiryYear: string,
    cvv: string
}

interface ProfileSettings {
    favorite: boolean,
    sameBillingAsShip: boolean
    //quicktask?: QuicktaskSettings
}

// interface QuicktaskSettings {

// }

export default ProfileObject;