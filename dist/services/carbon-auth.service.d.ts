import { EventEmitter } from "@angular/core";
import Context from "carbonldp/Context";
import * as AuthService from "./auth.service";
export declare class CarbonAuthService implements AuthService.Class {
    private _loggedInEmitter;
    private _loggedOutEmitter;
    private _authChangedEmitter;
    private context;
    readonly loggedInEmitter: EventEmitter<any>;
    readonly loggedOutEmitter: EventEmitter<any>;
    readonly authChangedEmitter: EventEmitter<any>;
    constructor(context: Context);
    isAuthenticated(): boolean;
    login(username: string, password: string, rememberMe: boolean): Promise<any>;
    logout(): void;
    register(name: string, username: string, password: string): Promise<any>;
    register(name: string, username: string, password: string, slug: string): Promise<any>;
}
