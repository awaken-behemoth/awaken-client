

export declare global {
	interface Window {
		init: () => void;
        gapi:{
            auth2: {
                init: ({client_id: string}) => void
                getAuthInstance: () => Auth2Instance
            }
        }
	}
}

interface Auth2Instance {
    currentUser: any;

    signIn: () => void;
}