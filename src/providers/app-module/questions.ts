export class Questions{
    question: string = "";
    answer : string = "";
    constructor(){}
    parseData(data){
        if(data){
            if("question" in data){
                this.question = data.question;
            }
            if("answer" in data){
                this.answer = data.answer;
            }
        }
    }
}

