export const formatDate = (date) => {
  const localDate = new Date(new Date(date).getTime() + (3 * 60 * 60 * 1000)); // somar 3h
  
  return localDate.toLocaleDateString('pt-BR');

};
