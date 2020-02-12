// regExpression for email validation
const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default emails => {
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email) === false)
        .filter(e => e !== '');
    if (invalidEmails.length > 0 || invalidEmails[0] === '') {
        return `the following emails are invalid: ${invalidEmails}`;
    }
    return;
};
