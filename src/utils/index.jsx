// EXPLICATION : Fonction pour slugifier l'input des joueurs
export const slugify = (input) => {
  let inputSlugified = input
    .replace(/\s/g, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
  return inputSlugified
}

export const slugifyNumbers = (input) => {
  let inputSlugified = input
    .replace(/\s/g, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^0-9]/g, "");
  return inputSlugified;
};

export const renderText = (data) => {
  if (typeof data === 'string') {
    return data
  }
  const text = data.map((el, i) => {
    if (el.startsWith("https://")) {
      return (
        <a
          className="modal-objectif__subtitle--link"
          key={i}
          href={el}
          target="_blank"
          rel="noreferrer noopener"
        >
          {el}
        </a>
      )
    } else {
      return (
        <p className="modal-objectif__subtitle" key={i}>
          {el}
        </p>
      )
    }
  })
  return text
}