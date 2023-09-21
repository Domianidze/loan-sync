const DUMMY_DATA = {
  loanees: [
    { id: "le0", name: "John Doe" },
    { id: "le1", name: "Jane Doe" },
  ],
  loans: [
    { id: "l0", amount: 100, loanee: { id: "le0", name: "John Doe" } },
    { id: "l1", amount: 100, loanee: { id: "le1", name: "Jane Doe" } },
  ],
};

export default DUMMY_DATA;
