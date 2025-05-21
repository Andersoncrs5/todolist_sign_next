export default interface Types {
  name: string;
  color: string;
  onClick: () => any | Promise<any> ;
  colorHover?: string;
  padding?: string;
  more?: string;
  colorTextHover?: string;
}