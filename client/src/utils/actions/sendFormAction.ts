import emailjs from "@emailjs/browser"

export const sendFormAction = async data => {
  try {
    // const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return await emailjs.sendForm("service_pqbpgjg", "sobesTopicsFeedbackForm", data, "l1LBuE0jVt7xC1_kY")
  } catch (e) {
    return e
  }
}
