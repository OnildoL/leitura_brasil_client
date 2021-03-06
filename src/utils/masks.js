export function currency(e) {
  let value = e.currentTarget.value
  value = value.replace(/\D/g, "")
  value = value.replace(/(\d)(\d{2})$/, "$1,$2")
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".")

  e.currentTarget.value = value
  return e
}
export function dateMask(e) {
  let value = e.currentTarget.value
  value = value.replace(/\D/g, "")
  value = value.replace(/(\d)(\d{2})$/, "$1/$2")
  value = value.replace(/(?=(\d{2})+(\D))\B/g, "/")
  value = value.replace(/\W(\d{2}$)/, "$1")

  e.currentTarget.value = value
  return e
}

export function initialDateMask(date) {
  let value = date
  value = value.replace(/\D/g, "")
  value = value.replace(/(\d)(\d{2})$/, "$1/$2")
  value = value.replace(/(?=(\d{2})+(\D))\B/g, "/")
  value = value.replace(/\W(\d{2}$)/, "$1")

  return value
};

export function currencyValue(e) {
  let value = e
  value = value.replace(/\D/g, "")
  value = value.replace(/(\d)(\d{2})$/, "$1,$2")
  value = value.replace(".", "")
  value = value.replace(",", ".")

  return value
}
