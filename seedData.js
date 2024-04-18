const { faker } = require('@faker-js/faker');
const { Service, Client, Truck, Appointment } = require('./models');

const seedTruck = async (num) => {
    const trucks = Array.from({ length: num }, () => ({
        brand: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        registration: faker.vehicle.vin(),
    }));
    
    await Truck.insertMany(trucks);
    console.log('Trucks seeded');
};

const seedClient = async (num) => {
    const truckIds = await Truck.find({}, '_id');
    if (!truckIds.length) {
        console.error('No trucks found. Cannot seed clients.');
        return;
    }

    const emails = new Set();
    const clients = [];

    while (clients.length < num) {
        let email = faker.internet.email();

        if (!emails.has(email)) {
            emails.add(email);

            clients.push({
                gender: faker.person.gender(),
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                company: faker.company.buzzNoun(),
                email: email,
                phone_number: email,
                promo_code: faker.string.alphanumeric(),
                truckId: faker.helpers.arrayElement(truckIds)._id,
            });
        }
    }

    await Client.insertMany(clients);
    console.log('Clients seeded');
};

const seedService = async (num) => {
    const services = Array.from({ length: num }, () => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        duration: faker.seed(1440),
    }));
    await Service.insertMany(services);
    console.log('Services seeded');
};

const seedAppointment = async (num) => {
    const clientIds = await Client.find({}, '_id');
    const serviceIds = await Service.find({}, '_id');
    const appointments = Array.from({ length: num }, () => {
        const startTime = faker.date.future();
        const endTime = new Date(startTime.getTime() + faker.seed(120) * 60000); // add 1 to 120 minutes to startTime
        return {
            startTime: startTime,
            endTime: endTime,
            status: faker.helpers.arrayElement(["pending", "confirmed", "cancelled"]),
            clientId: faker.helpers.arrayElement(clientIds)._id,
            serviceId: faker.helpers.arrayElement(serviceIds)._id,
        };
    });
    await Appointment.insertMany(appointments);
    console.log('Appointments seeded');
};

const limitCollection = async (Model, limit) => {
    const count = await Model.countDocuments();
    
    if (count > limit) {
        const excess = count - limit;
        const documentsToDelete = await Model.find().sort({ _id: 1 }).limit(excess);
        const idsToDelete = documentsToDelete.map(doc => doc._id);
        await Model.deleteMany({ _id: { $in: idsToDelete } });
    }
    console.log(`${Model.modelName} collection limited to ${limit}`);
    
};

const seedData = async () => {
    await Promise.all([
        limitCollection(Truck, 50),
        limitCollection(Client, 35),
        limitCollection(Service, 10),
        limitCollection(Appointment, 50)
    ]);

    await Promise.all([
        seedTruck(50),
        seedClient(35),
        seedService(10),
        seedAppointment(50)
    ]);

    console.log('Data seeding completed');
};

module.exports = seedData();
