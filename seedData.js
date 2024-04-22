const { faker } = require("@faker-js/faker");
const { Service, Client, Truck, Appointment } = require("./models");

const seedTruck = async (num) => {
  const trucks = Array.from({ length: num }, () => ({
    brand: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    registration: faker.vehicle.vin(),
  }));

  await Truck.insertMany(trucks);
  console.log("Trucks seeded");
};

const seedClient = async (num) => {
  const truckIds = await Truck.find({}, "_id");

  const clients = Array.from({ length: num }, () => ({
    gender: faker.person.gender(),
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    company: faker.company.buzzNoun(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    promo_code: faker.seed(10),
    truck: faker.helpers.arrayElement(truckIds)._id,
  }));

  await Client.insertMany(clients);
  console.log("Clients seeded");
};

const seedService = async (num) => {
  const services = Array.from({ length: num }, () => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    duration: faker.seed(1440),
  }));
  await Service.insertMany(services);
  console.log("Services seeded");
};
const seedAppointment = async (num) => {
    const clientIds = await Client.find({}, "_id");
    const serviceIds = await Service.find({}, "_id");
    
    const appointments = Array.from({ length: num }, () => {
      const startTime = faker.date.future();
      const endTime = new Date(startTime.getTime() + faker.seed(120) * 60000);
      const randomClient = faker.database.mongodbObjectId(clientIds)._id; 
      const randomService = faker.database.mongodbObjectId(serviceIds)._id;
      return {
        startTime: startTime,
        endTime: endTime,
        status: faker.helpers.arrayElement(["pending", "confirmed", "cancelled"]),
        client: randomClient, 
        service: randomService,
      };
    });
    await Appointment.insertMany(appointments);
    console.log("Appointments seeded");
  };
  
  
const limitCollection = async (Model, limit) => {
  const count = await Model.countDocuments();

  if (count > limit) {
    const excess = count - limit;
    const documentsToDelete = await Model.find().sort({ _id: 1 }).limit(excess);
    const idsToDelete = documentsToDelete.map((doc) => doc._id);
    await Model.deleteMany({ _id: { $in: idsToDelete } });
  }
  console.log(`${Model.modelName} collection limited to ${limit}`);
};

const seedData = async () => {
  await limitCollection(Truck, 50);
  await seedTruck(50);

  await limitCollection(Client, 50);
  await seedClient(50);

  await limitCollection(Service, 10);
  await seedService(10);

  await limitCollection(Appointment, 50);
  await seedAppointment(50);

  console.log("Data seeding completed");
};
module.exports = seedData;
