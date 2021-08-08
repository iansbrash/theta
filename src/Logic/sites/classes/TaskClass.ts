import Site from "../../interfaces/enums/Site";
import Size from "../../interfaces/enums/Size";
import ProfileObject from "../../interfaces/ProfileObject";
import ProxyList from "../../interfaces/ProxyList";
import Task from "../../interfaces/Task";
import store from "../../../redux/store";

export interface Delay {
    monitor : number,
    error : number
}

export interface cycleStatus {
    status: "Success" | "Warning" | "Error" | "Stopped",
    message: string,
    extraData?: any
}

export interface Storage {
    [key: string]: string
}

abstract class TaskClass implements Task {

    // Task interface
    identifier : number;
    site : Site;
    profile : ProfileObject;
    size : Size[];
    proxyList : ProxyList;
    input: string;

    // Defined for each task now
    allCookies : string[] = [];
    allCookiesObject : object = {};
    storage : Storage = {};
    status : string = "Idle";

    // Retrieved from store
    session : string;
    license : string;

    // Delays object
    delays : Delay;

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


        this.license = store.getState().session.license
        this.session = store.getState().session.session
    }

    resetTask() : void {
        this.nextFunctionIndex = 0;
        this.status = "Active";
        this.storage = {};
        this.allCookies = [];
    }

    abstract start() : Promise<{"status": string, "message": string}>;

    stop() : void {
        this.status = "Stopped"
    }

    // String representing the name of the array we are fetching our function calls from
    // i.e. "normalFlow," because we have an array called normalFlow which contains-
    // the names of functions we call to execute the flow
    abstract flow : string;

    // Current index we are on in the checkout process
    // i.e. nextFunctionIndex = 0, because we are about to fire/are firing the
    // GETAmazonLogin function
    abstract nextFunctionIndex : number;

    // Getter for our status
    getStatus : (() => string) = () => { return this.status; }

    // Cycle methods and variables
    async cycle() : Promise<cycleStatus> {
        if (this.status === "Active") {
            try {

                // @ts-ignore
                console.log(`about to run ${this[this.flow][this.nextFunctionIndex]}`)

                // @ts-ignore
                const res = await this[this[this.flow][this.nextFunctionIndex]]();

                let returnCycleStatus : cycleStatus = {
                    status: 'Success',
                    message: res.message
                }

                // @ts-ignore
                if (this[this.flowExtraData][this.nextFunctionIndex].length > 0) {
                    let extraData = {};
                    // @ts-ignore
                    this[this.flowExtraData][this.nextFunctionIndex].forEach(data => extraData = {...extraData, [data]: res.extraData[data]} )

                    returnCycleStatus.extraData = extraData;
                }

                this.nextFunctionIndex += 1;

                return returnCycleStatus;
            }
            // catches thrown error from nextFunction
            catch (err) {
                return err;
            }
        }
        else if (this.status === "Checked Out") {
            return {
                status: "Stopped",
                message: "Checked Out"
            }
        }
        else {
            return {
                status: "Stopped", 
                message: "Stopped"
            }
        }
    }

    async tryCatchWrapper(fn : (() => Promise<any>), successMessage : string) : Promise<cycleStatus> {
        try {
            
            const res = await fn();

            let returnCycleStatus : cycleStatus = {
                status: "Success",
                message: successMessage
            }

            if (res === null || res === undefined) {}
            else if (res.extraData) {
                returnCycleStatus.extraData = res.extraData;
            }

            return returnCycleStatus
        }
        catch (err) {
            
            console.log("tryCatchWrapper: got this error")
            console.log(err)
            // console.log(Object.keys(err))
            // console.log(err.isSleepy)

            throw {
                status: err.isError,
                message: err.message
            }
        }
    }

    nextFunction : (() => Promise<any>) = () => {
        return new Promise((res) => {
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

    abstract sendLocalDiscordSuccess() : Promise<void>;
    abstract getPublicDiscordSuccessHeaders() : Promise<{
        license: string,
        session: string,
        [key : string]: string | number
    }>
}

export default TaskClass;