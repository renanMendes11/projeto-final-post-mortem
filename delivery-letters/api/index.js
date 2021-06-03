const axios = require('axios');
const nodemailer = require("nodemailer");
const {IgApiClient} = require('instagram-private-api');

async function getContacts(userId){
    const userResponse = await axios.get(`http://localhost:8080/users/${userId}`);
    const user = userResponse.data;
    // console.log('email user', emailUser);
    const contactsResponse = await axios.get(`http://localhost:8080/contacts/user/${userId}`);
    const contacts = contactsResponse.data;
    // console.log('email contact', email);
    let emailContacts = [];
    let usernamesContacts = [];
      contacts.map((contact) => {
        emailContacts.push(contact.email);
        usernamesContacts.push(contact.userInstagram);
    })
    await sendEmail(user, emailContacts);
    await sendInstagramMenssage(usernamesContacts);

}

async function sendEmail(user, emailContacts){
  console.log('enviando emails');
  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: 'renantesteemail@gmail.com',
        pass: 'entrar@Gmail11'       
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    emailContacts.map(async emailContact => {
      await transporter.sendMail({
        from: `${user.name} <${user.email}>`, // sender address
        to: emailContact, // list of receivers
        subject: "Post Mortem", // Subject line
        text: "Post Mortem Message", // plain text body
        html: "<b>Mensagem teste de renan</b>", // html body
      });
    });

}

async function sendInstagramMenssage(usernamesContacts) {
  console.log('enviando mensagens no instagram');
  const ig = new IgApiClient();
  ig.state.generateDevice('postmortemteste')
  await ig.account.login('postmortemteste', 'entrarInsta').catch(async err => {
    console.log(err)
    await ig.challenge.auto(true);
  });
  usernamesContacts.map(async (username) =>{
    const userId = await ig.user.getIdByUsername(username);
    const thread = ig.entity.directThread([userId.toString()]);
    await thread.broadcastText('Mensagem teste de renan');
  });
}

module.exports = getContacts;