/** 
 * Interface for the Dir model
 * @author meugenom
 * @Date 2023-06-06
 * @interface Dir
 * @param {Dir[]} children - The children of the directory
 * @param {Data} data - The data of the directory* 
*/
export interface Dir {
    children: Dir[];
    data: Data;
}

interface Data {
    id: string;
	name: string;
    parentId: string;
    createdUserId: string;
    isDirectory: boolean;
}