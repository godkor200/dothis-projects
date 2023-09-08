export class UpdatePersonalTagDto {
  id: string;
  tag: string[];
  constructor(props: UpdatePersonalTagDto) {
    this.tag = props.tag;
    this.id = props.id;
  }
}
