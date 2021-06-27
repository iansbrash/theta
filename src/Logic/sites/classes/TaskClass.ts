import Site from "../../interfaces/enums/Site";
import Size from "../../interfaces/enums/Size";
import ProfileObject from "../../interfaces/ProfileObject";
import ProxyList from "../../interfaces/ProxyList";
import Task from "../../interfaces/Task";

export enum internalStatus {
    "Idle",
    "Active"
}

abstract class TaskClass implements Task {
    identifier;
    site;
    profile;
    size;
    proxyList;
    status : string;

    

    internalStatus : internalStatus;
    
    // statusWatcher : undefined | ((s : string) => void);
    input: string;


    constructor(
        identifier : number, 
        site : Site, 
        profile : ProfileObject, 
        size : Size[], 
        proxyList : ProxyList, 
        input : string
        ) {
        this.identifier = identifier;
        this.site = site;
        this.profile = profile;
        this.size = size;
        this.proxyList = proxyList;
        this.status = 'Idle';
        this.input = input;

        this.internalStatus = internalStatus.Idle
    }

    abstract start(): void;
    abstract stop(): void;

    getId() : number {
        return this.identifier;
    }

    // setStatusWatcher(f : (s : string) => void) {
    //     this.statusWatcher = f;
    // }
}

export default TaskClass;