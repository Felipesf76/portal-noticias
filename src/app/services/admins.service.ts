import { Injectable } from "@angular/core";
import { Admins } from "@app/models/Admins";

@Injectable()
export class AdminsService{
    constructor(){}
    getAdmins(): Array<Admins>{
        return[
            new Admins('375290d0-85ef-42af-b5a3-2a2b1b63bf5a'),
            new Admins('18349965-b565-42c1-a943-e8b6a6b2df21'),
            new Admins('a1928160-ee2a-4dcd-b75d-e15b9e0122d0')
        ]
    }
}

