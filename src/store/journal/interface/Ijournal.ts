export interface INote{
    id?:string
    title:string,
    body:'',
    date:number,
    imageUrls:string[] | []
}
export interface INoteCreation{
    title:string,
    body:string,
    date:number,
    imageUrls:string[] | []
}