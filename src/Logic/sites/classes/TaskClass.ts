import Site from "../../interfaces/enums/Site";
import Size from "../../interfaces/enums/Size";
import ProfileObject from "../../interfaces/ProfileObject";
import ProxyList from "../../interfaces/ProxyList";
import Task from "../../interfaces/Task";
import store from "../../../redux/store";

export enum internalStatus {
    "Idle",
    "Active"
}

export interface Delay {
    monitor : number,
    error : number
}

export interface cycleStatus {
    status: "Success" | "Error" | "Stopped",
    message: string,
    extraData?: any
}

abstract class TaskClass implements Task {
    identifier;
    site;
    profile;
    size;
    proxyList;
    status : string;
    session : string;
    license : string;
    delays : Delay;

    

    internalStatus : internalStatus;
    
    // statusWatcher : undefined | ((s : string) => void);
    input: string;


    constructor(
        identifier : number, 
        site : Site, 
        profile : ProfileObject, 
        size : Size[], 
        proxyList : ProxyList, 
        input : string,
        monitor : number,
        error : number
        ) {
        this.identifier = identifier;
        this.site = site;
        this.profile = profile;
        this.size = size;
        this.proxyList = proxyList;
        this.status = 'Idle';
        this.input = input;

        this.delays = {
            monitor,
            error
        }

        this.internalStatus = internalStatus.Idle

        this.license = store.getState().session.license
        this.session = store.getState().session.session
    }

    abstract start(): void;
    abstract stop(): void;
    getStatus : (() => string) = () => { return this.status; }

    // Cycle methods and variables
    abstract cycle(): Promise<cycleStatus>;
    nextFunction : (() => Promise<any>) = () => {
        return new Promise((res, rej) => {
            return res(null);
        })
    };


    getId() : number {
        return this.identifier;
    }

    setDelays(m : number, e : number) {
        this.delays = {
            monitor: m,
            error: e
        }
    }
}

export default TaskClass;