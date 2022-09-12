export interface INotification {
	message: string,
	type: NotificationType,
	duration: number
}
export enum NotificationType {
	Success = 0,
	Warning = 1,
	Error = 2
}