import { Router, ComponentInstruction } from "@angular/router-deprecated";

import { inject, activeContext } from "./../boot";
import { SecurityAnnotation } from "./SecurityAnnotation";
import { makeCanActivateChainableDecorator } from "./CanActivateUtils";

class RequiresActiveContextAnnotation implements SecurityAnnotation {
	evaluate:( next:ComponentInstruction, previous:ComponentInstruction ) => Promise<boolean> | boolean;

	constructor( options:{ redirectTo:any[] } ) {
		this.evaluate = function ( next:ComponentInstruction, previous:ComponentInstruction ):Promise<boolean> | boolean {
			let router:Router = inject( Router );

			return activeContext.promise.then( () => {
				return true;
			} ).catch( ( error ) => {
				router.navigate( options.redirectTo );
				return false;
			} );
		};
	}
}

export let RequiresActiveContext:( options:{ redirectTo:any[] } ) => ClassDecorator = makeCanActivateChainableDecorator( RequiresActiveContextAnnotation );
