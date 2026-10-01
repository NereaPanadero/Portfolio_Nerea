// Tiny cross-component events (keeps the chat bundle lazy).
export const openChat = (question) =>
  window.dispatchEvent(new CustomEvent("open-chat", { detail: { question } }));
