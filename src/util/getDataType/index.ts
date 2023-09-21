const getDataType = (id?: string) => {
  if (!id) return;

  const dataType = id.startsWith("le") ? "loanee" : "loan";

  return dataType;
};

export default getDataType;
