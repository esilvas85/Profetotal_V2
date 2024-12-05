const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Código creado por Nicolas Salinas para ProfeTotal.

// Instrucciones para iniciar el chat bot:
// - Debes tener node.js instalado en tu computadora, la versión debe ser 16 o superior (mejor instalar la última versión).
// - Debes tener npm instalado en tu computadora, la versión debe ser 8 o superior (mejor instalar la última versión).
// - Para iniciar el bot, abre una terminal (CMD) y ubícate en la carpeta donde se encuentra este archivo.
// - Luego, escribe el siguiente comando: npm install
// - Luego, escribe el comando: npm start
// - Luego, escanea el código QR del archivo bot.qr.png con tu celular desde WhatsApp (ve a los 3 puntos de la esquina superior derecha, luego a WhatsApp web y escanea el código).
// - Luego, el bot ya estaría funcionando en el celular.



// Flow de volver al menú anterior
const flowVolverMenuAnterior = addKeyword(['5', 'volver']).addAnswer([
    '👉 *ingresa 1* para consultar los precios de las clases',
    '👉 *ingresa 2* para revisar la disponibilidad de las clases',
    '👉 *ingresa 3* para agendar una clase',
    '👉 *ingresa 4* para solicitar hablar con una persona'
]);

// Flow de disponibilidad de clases
const flowDisponibilidadClases = addKeyword(['2', 'disponibilidad']).addAnswer([
    '📄 Ingrese al siguiente link para ver los horarios disponibles.',
    'https://book.plandok.com/es/agenda-clasesmatepro'
]).addAnswer([
    '👉 *ingresa 1* para consultar los precios de las clases',
    '👉 *ingresa 3* para agendar una clase',
    '👉 *ingresa 4* para solicitar hablar con una persona',
    '👉 *ingresa 5* para volver al menu anterior'
], null, [flowVolverMenuAnterior]);

// Flow de agendar clases
const flowAgendarClases = addKeyword(['3', 'agendar']).addAnswer([
    '📄 Para agendar una clase por favor ingrese al siguiente link.',
    'https://book.plandok.com/es/agenda-clasesmatepro'
]).addAnswer([
    '👉 *ingresa 1* para consultar los precios de las clases',
    '👉 *ingresa 2* para revisar la disponibilidad de las clases',
    '👉 *ingresa 4* para solicitar hablar con una persona',
    '👉 *ingresa 5* para volver al menu anterior'
], null, [flowVolverMenuAnterior]);

// Flow de hablar con una persona
const flowHablarPersona = addKeyword(['4', 'hablar']).addAnswer([
    '📄 Para hablar con una persona por favor tenga paciencia, lo atenderemos lo antes posible ;)'
], null, [flowVolverMenuAnterior]);

// Flow de precios de las clases
const flowPrecioClases = addKeyword(['1', 'precio']).addAnswer([
    '📄 Nuestros valores para clase de matemáticas son:',
    '*Educacion Basica y Media*: $10.000',
    '*Educacion Superior*: $15.000'
]).addAnswer([
    '👉 *ingresa 2* para revisar la disponibilidad de las clases',
    '👉 *ingresa 3* para agendar una clase',
    '👉 *ingresa 4* para solicitar hablar con una persona',
    '👉 *ingresa 5* para volver al menu anterior'
], null, [flowVolverMenuAnterior]);

// Flow principal
// Lo primero que el usuario verá al mandar algún mensaje
const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'hi', 'hello', 'saludos', 'saludo', 'buenas', 'buenos', 'buenas tardes', 'buenas noches', 'buenos dias', 'buenas madrugadas', 'buenas mañanas', 'wenas'])
    .addAnswer('🙌 !Hola¡ bienvenido a MatePRO, soy un bot, por favor ingresa la opción que quieras consultar')
    .addAnswer([
        '👉 *ingresa 1* para consultar los precios de las clases',
        '👉 *ingresa 2* para revisar nuestros horarios disponibles',
        '👉 *ingresa 3* para agendar una clase',
        '👉 *ingresa 4* para solicitar hablar con una persona'
    ], null, [flowPrecioClases, flowDisponibilidadClases, flowAgendarClases, flowHablarPersona]);

// NO TOCAR NADA DE AQUÍ PARA ABAJO A NO SER QUE SE SEPA LO QUE SE ESTÁ HACIENDO.
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal, flowPrecioClases, flowDisponibilidadClases, flowAgendarClases, flowHablarPersona, flowVolverMenuAnterior]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
}

main().catch(err => console.error('Error in main function:', err));
