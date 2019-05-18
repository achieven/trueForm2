export class Option {
    id: number;
    questionId: number;
    src: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.questionId;
        this.src = data.src;
        this.isAnswer = data.isAnswer;
    }
}
