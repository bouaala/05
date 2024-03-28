import { request } from 'http';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class DataController implements Controller {
   public path = '/api/data';
   public router = Router();

   constructor() {
       this.initializeRoutes();
   }

   private initializeRoutes() {
       this.router.get(`${this.path}/:id`, this.get);
       this.router.get(`${this.path}/latest`, this.getLatestReadingsFromAllDevices);
       this.router.get(`${this.path}/:id/latest`,this.getLatestID);
       this.router.get(`${this.path}/:id/:num`, this.getRange);
       this.router.post(`${this.path}/:id`, this.addData);
       this.router.delete(`${this.path}/all`, this.deleteAll);
       this.router.delete(`${this.path}/:id`, this.deleteSel);

   }

   private getLatestReadingsFromAllDevices = async (request: Request, response: Response) => {
    console.log('jest');
    response.status(200).json(testArr);
 };

 private addData = async (request: Request, response: Response, next: NextFunction) => {
    const { elem } = request.body;
    const { id } = request.params;
    testArr.push(Number(id));
    response.status(200).json(id);
};

private get = async(request: Request, response: Response, next: NextFunction) => {
    const {id} = request.params;
    response.status(200).json(testArr[Number(id)]);
};

private getLatestID = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    let max = -Infinity; 
    for (let i = 0; i < testArr.length; i++) {
        if (testArr[i] > max) {
            max = testArr[i]; 
    }    
}
    response.status(200).json(max);
};

private getRange = async (request: Request, response: Response, next: NextFunction) => {
    const id = Number(request.params.id);
    const number = Number(request.params.num);

    const array = testArr.slice(id, id+number);
    response.status(200).json(array);
};

private deleteAll = async(request: Request, response: Response, next: NextFunction) => {
    testArr = [];
    response.status(200).json(testArr);
};

private deleteSel = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const arr = testArr.filter(item => item !== Number(id));
    response.status(200).json(arr);
};

}

export default DataController;