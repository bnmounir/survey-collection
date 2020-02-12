const keys = require('../../config/keys');

module.exports = survey => {
    return `
    <html>
    <body>
    <div style="text-align: center">
    <h3>Your feedback is important</h3>
    <p>Please take a seconds to answer this quick question</p>
    <p>${survey.body}</p>
    <div>
    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes/thanks">Yes</a>
    </div>
    <div>
    <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no/thanks">No</a>
    </div>
    </div>
    </body>
    </html>

    `;
};
