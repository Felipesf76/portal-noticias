import { Injectable } from "@angular/core";
import { Califications } from "@app/models/Califications";

@Injectable()
export class CalificationService{
    constructor(){

    }

    getCalifications():Array<Califications>{
        return [
            new Califications('375290d0-85ef-42af-b5a3-2a2b1b63bf5a', '2914bb72-5cca-478b-b48a-f8762073d77e', 5),
            new Califications('375290d0-85ef-42af-b5a3-2a2b1b63bf5a', '9792b403-cfd3-4e49-b6b7-1df00d092052',3),
            new Califications('4fa006d9-e5cc-47ea-b885-eb3d0085c17a', '9792b403-cfd3-4e49-b6b7-1df00d092052',3),
            new Califications('4fa006d9-e5cc-47ea-b885-eb3d0085c17a', 'c6675880-d501-4928-9647-35fa75a81c23',1),
            new Califications('18349965-b565-42c1-a943-e8b6a6b2df21', 'c6675880-d501-4928-9647-35fa75a81c23',3),
            new Califications('bb383bbb-7a4a-4ba3-ada2-4d33559cd916', 'c6675880-d501-4928-9647-35fa75a81c23',4),
            new Califications('a1928160-ee2a-4dcd-b75d-e15b9e0122d0', '2914bb72-5cca-478b-b48a-f8762073d77e',3),
            new Califications('a1928160-ee2a-4dcd-b75d-e15b9e0122d0', 'c6675880-d501-4928-9647-35fa75a81c23',3)
        ]
    }
}

