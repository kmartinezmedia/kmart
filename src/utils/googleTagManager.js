export const gta = {}

gta.push = (data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data)
}