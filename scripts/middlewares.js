module.exports = (ref) => {
    
    return {
        logger: (req, res) => {
            let text = `
${ref.util.timestamp()}:
    req made!
`;
            ref.util.log(text);
            req.next();
        }
    }
}