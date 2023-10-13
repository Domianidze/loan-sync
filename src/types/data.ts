export type TLoanee = {
  id: string;
  type: "loanee";
  name: string;
};

export type TLoan = {
  id: string;
  type: "loan";
  amount: string;
  loanee: TLoanee;
};

export type TAddParams = {
  type: "loanee" | "loan";
  name?: string;
  amount?: string;
  loaneeId?: string;
};

export type TEditParams = {
  id: string;
  type: string;
  name?: string;
  amount?: string;
  loaneeId?: string;
};

export type TRemoveParams = {
  id: string;
  type: string;
};
