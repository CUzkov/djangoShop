const API_HOST: string = 'http://127.0.0.1:8000'


export class APIGetContent {
    
    static getSideBar = async ():Promise<ISideBar> => {

        let response = await fetch(API_HOST + '/api/item/');
        let responseJSON = response.json();
        
        return responseJSON;

    }

}