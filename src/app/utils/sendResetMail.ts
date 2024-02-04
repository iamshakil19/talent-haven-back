// import nodemailer from 'nodemailer';
// import config from '../../../config';

// export async function sendEmail(
//     to: string,
//     html: string
// ) {
//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: config.NODE_ENV === 'production',
//         auth: {
//             user: config.email,
//             pass: config.appPass,
//         },
//     });

//     await transporter.sendMail({
//         from: config.email, // sender address
//         to, // list of receivers
//         subject: "Reset Password Link", // Subject line
//         html, // html body
//     });
// }