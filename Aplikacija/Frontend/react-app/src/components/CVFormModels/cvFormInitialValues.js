import cvFormModel from "./cvFormModel";

const {
    formField: {
        phone,
        email,
        address,
        city
    }
} = cvFormModel;

export default {
    [phone.name]: '',
    [email.name]: '',
    [address.name]: '',
    [city.name]: ''

};