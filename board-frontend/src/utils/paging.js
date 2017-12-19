export default class Paging{
    constructor(totCnt,page, rows, blkSize){
        this.totalRows = totCnt;            //총 건수
        this.pageRows = rows || 10;         //한 페이지에 출력 될 항목 갯수
        this.currentPage = page || 1;       //현재 페이지
        this.blockSize = blkSize || 10; //화면에 출력할 블록 수
        this.totalPage = undefined;                  //전체 페이지 수

        this.startBlock = undefined;                //페이징 블록 시작 숫자
        this.endBlock = undefined;                  //페이징 블록 종료 숫자
        this.init();
    }

    init(){

        
        if(this.totalRows % this.pageRows==0){
            this.totalPage = parseInt(this.totalRows/this.pageRows);
        } else{
            this.totalPage = parseInt(this.totalRows/this.pageRows+1);
        }
            

        this.startBlock = parseInt(this.currentPage - (this.blockSize/2));
        if(this.startBlock <= 0){
            this.startBlock = 1;
        }
            
        
        this.endBlock = this.startBlock+this.blockSize-1;
        if(this.endBlock > this.totalPage){
            this.endBlock = this.totalPage;
        }
            

        
    }

    getTotCnt(){
        return this.totalRows;
    }
    
    getCurrentPage(){
        return this.currentPage;
    }

    getStartBlock(){
        return this.startBlock;
    }

    getEndBlock(){
        return this.endBlock;
    }

    getTotalPage(){
        return this.totalPage;
    }
}