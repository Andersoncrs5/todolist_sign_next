export default interface Types {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type: string;
  more?: string;
  id?: string;
  nameLabel?: string
  max?: number
  min?: number
}