export class UpdateSearchWordDto {
  id: string;
  searchWord: string[];
  constructor(props: UpdateSearchWordDto) {
    this.searchWord = props.searchWord;
    this.id = props.id;
  }
}
