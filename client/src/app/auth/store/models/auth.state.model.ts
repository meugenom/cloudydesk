import {User} from '../../../user/models/user';
export interface AuthStateInterface {
	isSubmitting: boolean,
	user: User,
	lastAction: string,
	lastActionDate: Date
}