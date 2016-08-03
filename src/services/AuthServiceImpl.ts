import { Injectable, Inject, EventEmitter } from "@angular/core";

import * as Cookies from "js-cookie";

import Context from "carbonldp/Context";
import Credentials from "carbonldp/Auth/Credentials";

import { AUTH_COOKIE, ContextToken } from "./../boot";

import * as AuthService from "./AuthService";

@Injectable()
export class AuthServiceImpl implements AuthService.Class {
	private _loggedInEmitter:EventEmitter<any>;
	private _loggedOutEmitter:EventEmitter<any>;
	private _authChangedEmitter:EventEmitter<any>;
	private context:Context;

	get loggedInEmitter():EventEmitter<any> { return this._loggedInEmitter };

	get loggedOutEmitter():EventEmitter<any> { return this._loggedOutEmitter };

	get authChangedEmitter():EventEmitter<any> { return this._authChangedEmitter };

	constructor( @Inject( ContextToken ) context:Context ) {
		this.context = context;
		this._loggedInEmitter = new EventEmitter<any>();
		this._loggedOutEmitter = new EventEmitter<any>();
		this._authChangedEmitter = new EventEmitter<any>();

		this.loggedInEmitter.subscribe( ( value:any ) => this.authChangedEmitter.emit( value ) );
		this.loggedOutEmitter.subscribe( ( value:any ) => this.authChangedEmitter.emit( value ) );
	}

	isAuthenticated():boolean {
		return this.context.auth.isAuthenticated();
	}

	login( username:string, password:string, rememberMe:boolean ):Promise<any> {
		return this.context.auth.authenticate( username, password ).then( ( credentials:Credentials ) => {
			if( rememberMe ) Cookies.set( AUTH_COOKIE, JSON.stringify( {
				expirationTime: credentials.expirationTime,
				key: credentials.key
			} ) );
			this.loggedInEmitter.emit( null );
			return credentials;
		} );
	}

	logout():void {
		Cookies.remove( AUTH_COOKIE );
		this.context.auth.clearAuthentication();
		this.loggedOutEmitter.emit( null );
	}
}
