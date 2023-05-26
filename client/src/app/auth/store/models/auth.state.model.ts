import {User} from '../../user/model/user';
export interface AuthStateInterface {
	isSubmitting: boolean,
	user: User
}