import {$Fetch} from "nitropack";

declare global {
    let $instanceFetch: $Fetch
    namespace NodeJS {
        interface Global {
            $instanceFetch: $Fetch
        }
    }
}