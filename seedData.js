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
    const emails = new Set();
    const clients = [];

    for (let i = 0; i < num; i++) {
        let email = faker.internet.email();
        if (emails.has(email)) {
            i--;
            continue;
        }
        emails.add(email);

        clients.push({
            gender: faker.person.gender(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            company: faker.company.buzzNoun(),
            email: email,
            phone_number: faker.phone.number(),
            promo_code: faker.string.alphanumeric(),
            truckId: faker.helpers.arrayElement(truckIds)._id,
        });
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

const seedData = async () => {
    const numTrucks = await Truck.countDocuments();
    const numClients = await Client.countDocuments();
    const numServices = await Service.countDocuments();
    const numAppointments = await Appointment.countDocuments();

    if (numTrucks <= 50) {
        await seedTruck(50);
    } else {
        console.log('Trucks collection already seeded');
    }

    if (numClients <= 35) {
        await seedClient(35);
    } else {
        console.log('Clients collection already seeded');
    }

    if (numServices <= 10) {
        await seedService(10);
    } else {
        console.log('Services collection already seeded');
    }

    if (numAppointments <= 50) {
        await seedAppointment(50);
    } else {
        console.log('Appointments collection already seeded');
    }
    console.log('Data seeding completed');
};


module.exports = seedData();
