import { CreateUserDTO } from '../../dto/CreateUser.dto';
import { ServiceResponse } from '../../helper/ServiceResponse';

export const createUser = (data:CreateUserDTO):ServiceResponse =>{
    const {name,surname,age} = data.information;
    let successMessage = `Name:${name} surname:${surname} and Age:${age}.`
    return new ServiceResponse({data:successMessage,success:true});
}