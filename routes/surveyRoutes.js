const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('mongoose').model('surveys');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: 0
        });
        res.send(surveys);
    });

    app.get('api/surveys/:surveyId/:choice/thanks', (req, res) => {
        res.send(`
        <!DOCTYPE html>
        <html lang="en" style="margin: 0; background-color: rgb(149, 250, 250);">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Thank you</title>
            </head>
            <body>
                <div style="text-align: center; margin-top: 30px;">
                    <h1>Thank you for your Feedback!</h1>
                </div>
                <script>
                    setTimeout(() => window.close(), 2000);
                </script>
            </body>
        </html>
        `);
    });

    app.post('/api/surveys/webhook', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice/thanks');
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    const { surveyId, choice } = match;
                    return {
                        email,
                        surveyId,
                        choice
                    };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        _id: surveyId,
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                    }
                ).exec();
            })
            .value();

        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients
                .split(',')
                .map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        // time to send the mass email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (e) {
            res.status(422).send(e);
        }
    });
};
