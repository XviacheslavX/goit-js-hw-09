import { isEmail } from "validator"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

const storageKey = "feedback-form-state"
const savedData = JSON.parse(localStorage.getItem(storageKey)) || {}
const formData = {
  email: savedData.email ?? "",
  message: savedData.message ?? "",
}
const form = document.querySelector(".feedback-form")
Array.from(form.elements).forEach(item => {
  if (item.nodeName !== "INPUT" && item.nodeName !== "TEXTAREA") return
  item.value = formData[item.name]
})
const checkValidity = () => {
  return (
    formData.email.trim() === "" ||
    !isEmail(formData.email) ||
    formData.message.trim() === ""
  )
}
form.addEventListener("input", e => {
  formData[e.target.name] = e.target.value
  localStorage.setItem(storageKey, JSON.stringify(formData))
})
form.addEventListener("submit", e => {
  e.preventDefault()

  if (checkValidity()) {
    iziToast.error({
      title: "Hey",
      message: "Fill please all fields!",
    })
    return
  }
  console.log("Submitted form data:", { ...formData })

  iziToast.success({
    title: "Yoopeee",
    message: "Thank you for sending your message! 😊",
  })
  Array.from(form.elements).forEach(item => {
    if (item.nodeName !== "INPUT" && item.nodeName !== "TEXTAREA") return
    formData[item.name] = ""
    item.value = ""
  })

  localStorage.removeItem(storageKey)
})
