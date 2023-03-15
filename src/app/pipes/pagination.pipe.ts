import { PipeTransform,Pipe } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs";
@Pipe({
    name:'pagination'
})
export class paginationPipe implements PipeTransform{
transform(value:Observable<any[]>, currentPage:number, pageSize:number){
    return value.pipe(
        map(items=>{
            const startIndex=(currentPage-1)*pageSize;
            const endindex=startIndex+pageSize
            return items.slice(startIndex,endindex)
        })
    )
    
}
}