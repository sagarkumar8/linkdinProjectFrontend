export function validateName(name) {
  if (!name) {
    return "Name is required";
  }

  if (!name.trim()) {
    return "You can't use only spaces";
  }

  if (name.length < 3) {
    return "Name must be at least 3 characters";
  }

  return "";
}





export function validateEmail(email) {
  if (!email) {
    return "Email is required";
  }

  if (email.includes(" ")) {
    return "Email cannot contain spaces";
  }

  if (!email.includes("@")) {
    return "Email must contain @";
  }

  if (email.split("@").length !== 2) {
    return "Email can contain only one @";
  }

  const [username, domain] = email.split("@");

  if (!username.trim()) {
    return "Enter username before @";
  }

  if (!domain.trim()) {
    return "Enter domain after @";
  }

  if (!domain.includes(".")) {
    return "Domain must contain .";
  }

  return "";
}