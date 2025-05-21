export default interface Types {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  more?: string;
  nameLabel?: string;
  maxLength?: number;
  minLength?: number;
}