export type TLoanee = {
  id: string;
  name: string;
};

export type TLoan = {
  id: string;
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
  name?: string;
  amount?: string;
  loaneeId?: string;
};

export type TRemoveParams = {
  id: string;
};
