export const validateSignUpData = ({ name, email, password, username, confirmPassword }) => {
    if (!name) return "Name should fill must!!";
    if (!email) return "Email should fill must!!";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format, must have @ symbol";
    if (!username) return "Username is empty but it shu";
    if (!password) return "Password can't be empty, you should enter the speccified things";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password))
        return "Password should be a minimum of 8 characters and must include at least one lowercase letter, one uppercase letter, one number, and one special character";
    if (password !== confirmPassword) return "Password not matched!!";
    return null;
};

export const validateLoginData = ({ loginId, password }) => {
    if (!loginId) return "need this section";
    if (!password) return "need this section";
    return null;
};
