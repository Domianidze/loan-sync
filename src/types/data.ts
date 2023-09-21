export type TLoanee = {
  id: string;
  name: string;
};

export type TLoan = {
  id: string;
  amount: number;
  loanee: TLoanee;
};

export type TAddParams = {
  type: "loanee" | "loan";
  name?: string;
  amount?: number;
  loaneeId?: string;
};

export type TEditParams = {
  id: string;
  name?: string;
  amount?: number;
  loaneeId?: string;
};

export type TRemoveParams = {
  id: string;
};
