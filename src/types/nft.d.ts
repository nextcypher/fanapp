export interface INFT_Attribute {
  value: string;
  trait_type: string;
}

export interface INFT {
  name: string;
  description: string;
  image: string;
  edition: number;
  attributes: Attribute[];
  artist: string;
}
