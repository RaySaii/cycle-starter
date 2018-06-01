import {Component} from './interfaces';
import {Counter} from './components/counter';
import {Speaker} from './components/speaker';
import {Test} from "./components/test";

export interface RouteValue {
    component: Component;
    scope: string;
}

export interface Routes {
    readonly [index: string]: RouteValue;
}

export const routes = {
    '/': {component: Counter, scope: 'counter'},
    '/p2': {component: Speaker, scope: 'speaker'},
    '/test': {component: Test, scope: 'test'}
};

export const initialRoute = '/';
