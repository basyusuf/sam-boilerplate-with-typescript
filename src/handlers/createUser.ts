import {Response} from '../helper/Response';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import DTOValidator from '../service/DTOValidator';
import { RequestDTO } from '../dto/Request.dto';
import { CreateUserDTO } from '../dto/CreateUser.dto';
import { createUser } from '../service/User/user.service';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    // All log statements are written to CloudWatch
    console.info('received:', event);
    let checkRequestData = await DTOValidator(RequestDTO, event, 'Main Request Handler');
    if (checkRequestData) {
        return new Response({statusCode:400,body:checkRequestData,event}).get();
    } else {
        //Use (try and catch) as much as possible
        try {
            const body = JSON.parse(event.body);
            const ErrorCheck = await DTOValidator(CreateUserDTO, body, 'Sample Request Validation');
            if (ErrorCheck) {
                console.info('System have validation error. List:', ErrorCheck);
                return new Response({statusCode:400,body:ErrorCheck,event}).get();
            }
            let createStatus = createUser(body);
            if(createStatus.success){
                return new Response({statusCode:201,message:createStatus.data,event,body:null}).get();
            } else {
                return new Response({statusCode:400,event,body:{error:createStatus.error}}).get();
            }
        } catch (err) {
            console.error(err);
            return new Response({statusCode:400,message:"Error occured while parsing body",event,body:null}).get();
        }
    }
};
