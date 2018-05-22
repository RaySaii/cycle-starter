// tslint:disable-next-line
/// <reference path="../node_modules/snabbdom-pragma/snabbdom-pragma.d.ts" />
declare module 'cycle-restart';

declare var Snabbdom: any; //Automaticly imported into every file
declare module '*.less' {
    const content: any
    export default content
}
declare module '*.scss' {
    const content: any
    export default content
}